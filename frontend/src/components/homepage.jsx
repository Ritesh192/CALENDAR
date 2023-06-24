import React from "react";
import ReactDOM from 'react-dom/client';
import { Button, RepeatButton, ToggleButton, PowerButton } from 'smart-webcomponents-react/button';
import { Calendar } from 'smart-webcomponents-react/calendar';
import { Input } from 'smart-webcomponents-react/input';
import { Tree, TreeItem, TreeItemsGroup } from 'smart-webcomponents-react/tree';
import { Scheduler } from 'smart-webcomponents-react/scheduler';
import "./homepage.css";

class DemoApp extends React.Component {
	constructor(props) {
		super(props);

		this.scheduler = React.createRef();
		this.calendar = React.createRef();
		this.tree = React.createRef();
		this.primaryContainer = React.createRef();

		const today = new Date(),
			currentDate = today.getDate(),
			currentYear = today.getFullYear(),
			currentMonth = today.getMonth(),
			currentHours = today.getHours(),
			currentMinutes = today.getMinutes(),
			thanksgiving = (() => {
				const tempDate = new Date(currentYear, 10, 1);
				//4th Thursday of November
				tempDate.setDate(tempDate.getDate() - tempDate.getDay() + 25);
				return tempDate;
			})();

		this.nonworkingDays = this.getPastThreeWeekdays(today.getDay());
		this.data = [];
	}

	view = 'month';

	views = ['day',
		{
			type: 'week',
			hideWeekend: true,
		},
		{
			type: 'month',
			hideWeekend: true,
		}, 'agenda',
		{
			label: '4 days',
			value: 'workWeek',
			type: 'week',
			shortcutKey: 'X',
			hideWeekend: false,
			hideNonworkingWeekdays: true,
		}
	];

	firstDayOfWeek = 1;

	disableDateMenu = true;

	currentTimeIndicator = true;

	scrollButtonsPosition = 'far';

	getPastThreeWeekdays(weekday) {
		let weekdays = [];

		for (let i = 0; i < 3; i++) {
			weekdays.push((weekday - i + 7) % 7);
		}

		return weekdays;
	}

	updateData(event) {
		const item = event.detail.item,
			data = this.data;

		for (let i = 0; i < data.length; i++) {
			const dataItem = data[i];

			if (dataItem.label === item.label && dataItem.class === item.class) {
				event.type === 'itemRemove' ? this.data.splice(i, 1) : data.splice(i, 1, item);
				return;
			}
		}
	}

	handleToggle() {
		const primaryContainer = this.primaryContainer.current,
			scheduler = this.scheduler.current;

		primaryContainer.classList.toggle('collapse');
		scheduler.disableDateMenu = !primaryContainer.classList.contains('collapse');
	}

	addNew() {
		this.scheduler.current.openWindow({
			class: 'event'
		});
	}

	handleCalendarChange(event) {
		this.scheduler.current.dateCurrent = event.detail.value;
	}

	handleTreeChange() {
		const tree = this.tree.current;
		let selectedIndexes = tree.selectedIndexes, types = [];

		const getItemPromises = selectedIndexes.map(index => {
			return new Promise((resolve, reject) => {
			  tree.getItem(index, (result) => {
				resolve(result);
			  });
			});
		  });
		
		  Promise.all(getItemPromises)
			.then(results => {
			  types = results.map(result => result.value);
			  this.scheduler.current.dataSource = this.data.filter(d => types.indexOf(d.class) > -1);
			})
			.catch(error => {
			  console.error(error);
			});
		}
	handleDateChange(event) {
		this.calendar.current.selectedDates = [event.detail.value];
	}

	init() {
	}

	componentDidMount() {
		this.init();
	}

	render() {
		return (
			<div>
				<div id="primaryContainer" ref={this.primaryContainer}>
					<div id="header">
						<Button id="toggleButton" onClick={this.handleToggle.bind(this)}></Button>
						<div id="title">CALENDAR</div>
						<Button id="addNew" className="floating" onClick={this.addNew.bind(this)}><span>Create</span>
						</Button>
					</div>
					<div className="content">
						<section id="sideA">
							<div className="button-container">
								<div id="logo"></div>
							</div>
							<div className="controls-container">
								<Calendar ref={this.calendar} id="calendar" scrollButtonsPosition={this.scrollButtonsPosition} onChange={this.handleCalendarChange.bind(this)}></Calendar>
								<Input id="searchBar" className="underlined" placeholder="Search for people"></Input>
								<Tree ref={this.tree} id="tree" selectionMode="checkBox" toggleElementPosition="far" onChange={this.handleTreeChange.bind(this)}>
									<TreeItemsGroup expanded>My calendars
			                            <TreeItem value="birthday" selected>Birthdays</TreeItem>
										<TreeItem value="holiday" selected>Holidays</TreeItem>
										<TreeItem value="event" selected>Events</TreeItem>
									</TreeItemsGroup>
								</Tree>
							</div>
						</section>
						<section id="sideB">
							<Scheduler ref={this.scheduler} id="scheduler" dataSource={this.data} view={this.view} views={this.views} nonworkingDays={this.nonworkingDays}
								firstDayOfWeek={this.firstDayOfWeek}
								disableDateMenu={this.disableDateMenu}
								currentTimeIndicator={this.currentTimeIndicator}
								scrollButtonsPosition={this.scrollButtonsPosition} onDragEnd={this.updateData.bind(this)}
								onResizeEnd={this.updateData.bind(this)} onItemUpdate={this.updateData.bind(this)}
								onItemRemove={this.updateData.bind(this)} onDateChange={this.handleDateChange.bind(this)}></Scheduler>
						</section>
					</div>
				</div>
			</div>
		);
	}
}

export default DemoApp;