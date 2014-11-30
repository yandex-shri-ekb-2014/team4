module.exports = {
    getTomorrow: function () {
        var tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 1);
        tomorrow.setHours(0);
        tomorrow.setMinutes(0);
        tomorrow.setSeconds(0);

        return tomorrow;
    }
};
