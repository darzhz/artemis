exports.generateFreeHours = async (busyHours) => {
  const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const allHours = [1, 2, 3, 4, 5, 6, 7];
  const freeHoursByDay = {};

  // Initialize free hours for all days
  allDays.forEach((day) => {
    freeHoursByDay[day] = [...allHours];
  });

  // Update free hours based on busy hours
  for (const day of Object.keys(busyHours)) {
    const busyHoursOfDay = busyHours[day];
    freeHoursByDay[day] = allHours.filter(
      (hour) => !busyHoursOfDay.includes(hour)
    );
  }

  return freeHoursByDay;
};
