var myAPI = "http://127.0.0.1:8000/data.json";
$.getJSON(myAPI).done(function (data) {
    const dates = data.map(item => {
        const date = moment(item.date);
        return {
            day: date.format('YYYY-MM-DD'),
            hour: date.format('HH:mm'),
        }
    });

    const uniqueDatesFromData = [...new Set(dates.map(date => date.day))];

    const today = moment();
    let uniqueDates = [];
    for (let i = 0; i < 7; i++) {
        uniqueDates.push(moment(today).add(i, 'days').format('YYYY-MM-DD'));
    }

    let theadHTML = '<thead><tr>';
    let tbodyHTML = '';

    uniqueDates.forEach(date => {
        theadHTML += `<th scope="col">${moment(date).format('DD.MM.YYYY')}</th>`;
    });

    theadHTML += '</tr></thead>';

    for (let hour = 9; hour <= 23; hour++) {
        const hourStr = hour.toString().padStart(2, '0') + ":00";
        tbodyHTML += '<tr>';

        uniqueDates.forEach(date => {
            const isDisabled = dates.find(d => d.day === date && d.hour === hourStr) ? true : false;
            const btnClass = isDisabled ? 'btn-secondary' : 'btn-primary';
            const disabledAttr = isDisabled ? 'disabled' : '';
            const valueAttr = !isDisabled ? `value="${date} ${hourStr}:00"` : '';
            const modalAttr = !isDisabled ? `data-bs-target="#exampleModalToggle" data-bs-toggle="modal"` : '';
            tbodyHTML += `<td><button type="button" class="btn ${btnClass}" ${disabledAttr} ${valueAttr} ${modalAttr} onclick="getDateTime(this)">${hourStr}</button></td>`;
        });

        tbodyHTML += '</tr>';
    }

    tbodyHTML = `<tbody>${tbodyHTML}</tbody>`;

    document.querySelector('.tb').innerHTML += `${theadHTML}${tbodyHTML}`;
});