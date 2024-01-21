module.exports = {

  // Format Date Function: Converts a date to the format DD/MM/YY
  format_date: (date) => {
    return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear().toString().substr(-2)}`;
  },

  // Format Currency Function: Adds a dollar sign to the provided cost
  format_currency: (cost) => {
    return `$ ${cost}`;
  },

  // Format Amount Function: Adds commas to large numbers for better readability
  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  },
};