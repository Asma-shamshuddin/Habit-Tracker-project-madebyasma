import React, { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [habits, setHabits] = useState([]);

  // Load localStorage
  useEffect(() => {
    const data = localStorage.getItem("habits");
    if (data) {
      setHabits(JSON.parse(data));
    }
  }, []);

  // Save localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Add Habit
  const addHabit = () => {
    if (title.trim() === "") return;

    setHabits([
      ...habits,
      {
        title,
        streak: 0,
        done: false,
      },
    ]);

    setTitle("");
  };

  // Toggle Done
  const toggleHabit = (index) => {
    const copy = [...habits];

    copy[index].done = !copy[index].done;

    if (copy[index].done) {
      copy[index].streak += 1;
    }

    setHabits(copy);
  };

  // Reset streaks
  const resetStreak = () => {
    const reset = habits.map((h) => ({
      ...h,
      streak: 0,
      done: false,
    }));
    setHabits(reset);
  };

  // Progress
  const completed = habits.filter((h) => h.done).length;
  const total = habits.length;

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className=" w-125 bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-green-600 text-white text-center text-2xl font-bold p-4">
          Daily Habit Tracker
        </div>

        {/* Progress */}
        <div className="p-5">
          <p className="font-semibold text-gray-700 mb-2">
            Progress: {completed} / {total || 0} days completed
          </p>

          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-green-600 h-4 rounded-full"
              style={{
                width:
                  total === 0
                    ? "0%"
                    : `${(completed / total) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Add Habit */}
        <div className="px-5 pb-5">
          <p className="font-semibold mb-2">Add New Habit:</p>

          <div className="flex gap-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter habit..."
              className="flex-1 border rounded-lg p-2"
            />

            <button
              onClick={addHabit}
              className="bg-green-600 text-white px-4 rounded-lg"
            >
              Add Habit
            </button>
          </div>
        </div>

        {/* Habit List */}
        <div className="px-5 pb-5">
          <p className="font-semibold mb-3">My Habits</p>

          {habits.map((habit, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-3 mb-3 flex justify-between items-center shadow-sm"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleHabit(index)}
                  className={`w-6 h-6 rounded-md border flex items-center justify-center ${
                    habit.done
                      ? "bg-green-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {habit.done && "✔"}
                </button>

                <p
                  className={
                    habit.done ? "line-through text-gray-400" : ""
                  }
                >
                  {habit.title}
                </p>
              </div>

              <p className="text-green-600 font-semibold">
                {habit.streak} Day Streak →
              </p>
            </div>
          ))}

          {/* Reset */}
          <button
            onClick={resetStreak}
            className="w-full mt-4 bg-gray-400 text-white p-2 rounded-lg"
          >
            Reset Streaks
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;