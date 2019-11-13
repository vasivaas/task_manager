import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Pikaday from 'pikaday';

import '../styles/Pikaday.scss';


class DatePicker extends Component {
	handleDateChange = (e) => {
		this.changeDate(e.target.value);
	}
	changeDate = (date) => {
		const newDate = date ? moment(date, 'DD.MM.YYYY').format('YYYY-MM-DD') : '';
		this.props.dateChange(newDate);
	}
	componentDidMount() {
		this.picker = new Pikaday({
			field: this.date,
			format: 'DD.MM.YYYY',
			firstDay: 1,
			i18n: {
				previousMonth : 'Last mounth',
				nextMonth     : 'Next mounth',
				months        : ['Janvar','Fevral','Mart','Aprel','May','Uyn','Uyl',
								 'Avgust','Sentabr','Octabr','Noabr','Dekabr'],
				weekdays      : ['Sanday','Monday','Tuesday','Wednesday',
								 'Thursday','Friday','Suterday'],
				weekdaysShort : ['Sn','Mn','Tu','Wd','Th','Fr','Su']
			},
			onSelect: () => this.changeDate(this.date.value)
		});
	}
	componentWillUnmount() {
		delete this.picker;
	}
	render() {
		const { dateChange, ...props } = this.props;

		return (
			<input
				type="text"
				{...props}
				ref={ref => this.date = ref}
				onChange={this.handleDateChange} />
		);
	}
}

DatePicker.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	dateChange: PropTypes.func.isRequired
}

export default DatePicker;