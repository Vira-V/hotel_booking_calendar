<template>
  <div>
    <nav class="reservation-buttons">
      <button @click="moveWeek(-1)">&#8249;</button>
      <button @click="moveWeek(1)">&#8250;</button>
      <button @click="goToToday">Today</button>
    </nav>

    <div class="calendar-container">
      <div class="dates-container">
        <div class="dates-header">
          <div
            v-for="date in dates"
            :key="date"
            :class="{ 'current-day': isCurrentDay(date) }"
          >
            {{ date }}
          </div>
        </div>
      </div>

      <div class="reservations-container">
        <div
          v-for="apartment in filteredApartments"
          :key="apartment.id"
          class="apartment"
        >
          <div class="apartment-name">{{ apartment.roomDetails.name }}</div>
          <div v-for="date in dates" :key="date" class="reservation-cell">
            <div class="reservations-container">
              <div
                v-for="reservation in getReservationsForDay(apartment.id, date)"
                :key="reservation.id"
                class="reservation"
              >
                {{ reservation.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

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
    isCurrentDay(date) {
      const currentDate = new Date();
      return date === currentDate.toISOString().slice(0, 10);
    },
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
.calendar-container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.dates-container {
  position: sticky;
  z-index: 1;
  margin-left: 200px;
}

.dates-header {
  display: flex;
}

.dates-header > div {
  flex: 1;
  border: 1px solid #ccc;
  padding: 10px 20px;
  text-align: center;
}

.reservations-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
}

.apartment {
  display: flex;
}

.apartment-name {
  width: 190px;
  border: 1px solid #ccc;
  padding: 40px 5px;
}

.reservation-cell {
  flex: 1;
  border: 1px solid #ccc;
  padding: 40px 60px;
  position: relative;
  background-color: white;
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

.current-day {
  background-color: lightgreen;
}
</style>
