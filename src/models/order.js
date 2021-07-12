import moment from 'moment';

export class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this._date = date;
  }
  get date() {
    return moment(this._date).format('MMMM Do YYYY, hh:mm');
  }
}
