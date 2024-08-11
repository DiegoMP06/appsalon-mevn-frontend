import {parse, formatISO, parseISO, format} from 'date-fns';
import es from 'date-fns/locale/es'

export const convertToISO = (date) => {
    const newDate = parse(date, 'dd/MM/yyyy', new Date());
    return formatISO(newDate);
}

export const displayDate = (date) => {
    const newDate = parseISO(date);
    return format(newDate, 'PPPP', {locale: es});
}

export const converToDatePicker = (date) => {
    const newDate = parseISO(date);
    return format(newDate, 'dd/MM/yyyy');
}