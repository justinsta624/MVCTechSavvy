// Exporting an object with various utility functions
module.exports = {

  // Format Date Function: Converts a date to the format DD/MM/YY
  format_date: (date) => {
    return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear().toString().substr(-2)}`;
  },

  // Format Plural Function: Adds an 's' to a word if the amount is not 1
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }
    return word;
  },
};