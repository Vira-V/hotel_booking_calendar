<template>
  <div>
    <div class="reservation-buttons">
      <button @click="moveWeek(-1)">&#8249;</button>
      <button @click="moveWeek(1)">&#8250;</button>
      <button @click="goToToday">Today</button>
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="date in dates" :key="date">{{ date }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="apartment in filteredApartments" :key="apartment.id">
          <td>{{ apartment.roomDetails.name }}</td>
          <td v-for="date in dates" :key="date" class="reservation-cell">
            <div class="reservations-container">
              <div
                v-for="reservation in getReservationsForDay(apartment.id, date)"
                :key="reservation.id"
                class="reservation"
              >
                {{ reservation.name }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import reservationData from "./bookings.json";

export default {
  computed: {
    apartments() {
      return reservationData;
    },
    dates() {
      const startOfWeek = new Date(this.currentWeekStart);
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        dates.push(date.toISOString().slice(0, 10));
      }
      return dates;
    },
    filteredApartments() {
      const startOfWeek = new Date(this.dates[0]);
      const endOfWeek = new Date(this.dates[this.dates.length - 1]);

      return this.apartments.filter((apartment) => {
        const start = new Date(apartment.start);
        const end = new Date(apartment.end);

        return start <= startOfWeek && end >= endOfWeek;
      });
    },
    currentWeekStart() {
      return this.$store.getters.getCurrentWeekStart;
    },
  },
  methods: {
    getReservationsForDay(apartmentId, date) {
      const reservations = [];
      return reservations.filter((reservation) => {
        const start = new Date(reservation.start);
        return start.toLocaleDateString("en-US") === date;
      });
    },
    moveWeek(amount) {
      const newDate = new Date(this.currentWeekStart);
      newDate.setDate(newDate.getDate() + amount * 7);
      this.$store.dispatch("updateCurrentWeekStart", newDate);
    },
    goToToday() {
      this.$store.dispatch("updateCurrentWeekStart", new Date());
    },
  },
};
</script>

<style scoped>
.reservation-cell {
  border: 1px solid #ccc;
  position: relative;
}

.reservations-container {
  position: relative;
}

.reservation {
  padding: 6px;
  top: 0;
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.reservation-buttons {
  margin: 20px;
  display: flex;
  gap: 10px;
}

.reservation-buttons button {
  background-color: #000;
  font-size: 14px;
  color: white;
  padding: 4px 16px;
  transition: all 0.3s;
}

.reservation-buttons button:hover {
  color: #000;
  background-color: white;
  cursor: pointer;
}
</style>
