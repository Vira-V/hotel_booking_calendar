<template>
  <div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="apartment in apartments" :key="apartment.id">
          <td>{{ apartment.roomDetails.name }}</td>
          <td v-for="day in daysOfWeek" :key="day" class="reservation-cell">
            <div v-for="reservation in getReservationsForDay(apartment.id, day)" :key="reservation.id" class="reservation" :style="calculateReservationStyle(reservation)">
              {{ reservation.roomDetails.name }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import reservationData from './bookings.json';

export default {
  computed: {
    apartments() {
      return reservationData;
    },
    daysOfWeek() {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
  },
  methods: {
    getReservationsForDay(apartmentId, day) {
      const reservations = [];
      return reservations.filter(reservation => {
        const start = new Date(reservation.start);
        const end = new Date(reservation.end);
        return start <= day && day <= end;
      });
    },
    calculateReservationStyle(reservation) {
      const start = new Date(reservation.start);
      const end = new Date(reservation.end);
      const durationInDays = (end - start) / (1000 * 60 * 60 * 24) + 1;
      const dayIndex = this.daysOfWeek.indexOf(start.toLocaleDateString('en-US', { weekday: 'short' }));

      return {
        width: `${durationInDays * 100}%`,
        marginLeft: `${dayIndex * 100}%`,
      };
    }
  }
}
</script>

<style scoped>
.reservation-cell {
  border: 1px solid #ccc;
  position: relative;
}

.reservation {
  border: 1px solid #000;
  padding: 4px;
  margin: 2px;
  background-color: #c0c0c0;
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
