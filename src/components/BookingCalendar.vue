<template>
  <div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="date in dates" :key="date">{{ date }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="apartment in apartments" :key="apartment.id">
          <td>{{ apartment.roomDetails.name }}</td>
          <td v-for="date in dates" :key="date" class="reservation-cell">
            <div v-for="reservation in getReservationsForDay(apartment.id, date)" :key="reservation.id" class="reservation" :style="calculateReservationStyle(reservation)">
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
    dates() {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());

      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        dates.push(date.toISOString().slice(0, 10));
      }
      return dates;
    }
  },
  methods: {
    getReservationsForDay(apartmentId, date) {
      const reservations = [];
      return reservations.filter(reservation => {
        const start = new Date(reservation.start);
        // const end = new Date(reservation.end);
        return start.toLocaleDateString('en-US') === date;
      });
    },
    calculateReservationStyle(reservation) {
      const start = new Date(reservation.start);
      const end = new Date(reservation.end);
      const durationInDays = (end - start) / (1000 * 60 * 60 * 24) + 1;
      const dayIndex = this.dates.indexOf(start.toLocaleDateString('en-US'));

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