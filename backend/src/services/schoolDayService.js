import { SCHOOL_WEEKDAYS } from '../config/constants.js';
import { isHoliday } from '../repositories/holidayRepository.js';

/**
 * plan/13 School Day Logic + CLAUDE.md Hard Rule: "Never send a message on
 * weekends or public holidays." Pakistan school week is Mon-Fri.
 */
export async function isSchoolDay(date = new Date(), province = 'all') {
  if (!SCHOOL_WEEKDAYS.includes(date.getDay())) return false;
  const dateIso = date.toISOString().slice(0, 10);
  const holiday = await isHoliday(dateIso, province);
  return !holiday;
}
