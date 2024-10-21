"use client";

import Image from "next/image";
import Counter from "@/components/counter";
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const inputRef = useRef(null);
  const tasksDivRef = useRef(null);
  const [taskCount, setTaskCount] = useState(0);
  const [taskDoneCount, setTaskDoneCount] = useState(0);
  const [tasks, setTasks] = useState([]);

  const addNewTask = () => {
    const taskText = inputRef.current.value.trim();
    if (taskText === "") {
      alert("Zadej platný text");
      return;
    }

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
      text: taskText,
      done: false,
    };

    existingTasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    inputRef.current.value = "";

    setTaskCount(existingTasks.length);
    setTasks(existingTasks);
    updateTaskDoneCount(existingTasks);

    if (tasksDivRef.current) {
      tasksDivRef.current.scrollTop = tasksDivRef.current.scrollHeight;
    }
  };

  const markTaskAsDone = (index) => {
    const existingTasks = [...tasks];
    existingTasks[index].done = !existingTasks[index].done;

    localStorage.setItem("tasks", JSON.stringify(existingTasks));
    setTasks(existingTasks);
    updateTaskDoneCount(existingTasks);
  };

  const deleteTask = (index) => {
    const existingTasks = [...tasks];
    existingTasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    setTaskCount(existingTasks.length);
    setTasks(existingTasks);
    updateTaskDoneCount(existingTasks);
  };

  const updateTaskDoneCount = (tasks) => {
    const doneTasks = tasks.filter((task) => task.done).length;
    setTaskDoneCount(doneTasks);
  };

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTaskCount(savedTasks.length);
    setTasks(savedTasks);
    updateTaskDoneCount(savedTasks);
  }, []);

  useEffect(() => {
    if (tasksDivRef.current) {
      tasksDivRef.current.scrollTop = tasksDivRef.current.scrollHeight;
    }
  }, [tasks]);

  return (
    <>
      <div className="flex flex-col w-[500px] h-[800px] gap-8 items-center bg-[#fff] border-none rounded-[25px] pt-14 pb-5 px-20">
        <div className="flex flex-col gap-[100px]">
          <div className="flex flex-row justify-center gap-36">
            <Counter type="done" valueDone={taskDoneCount} />
            <Counter type="amount" valueSet={taskCount} />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div
              className="w-full h-[380px] overflow-y-auto border border-gray-300 rounded p-2"
              ref={tasksDivRef}
            >
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className={`task-item p-2 border-b border-gray-300 w-full flex justify-between items-center ${
                    task.done ? "bg-green-100" : ""
                  }`}
                >
                  <span>{task.text}</span>
                  <div className="flex gap-2">
                    <i
                      className={`bx bx-check ${
                        task.done ? "bg-blue-500" : "bg-gray-500"
                      } text-white p-3 rounded justify-center items-center`}
                      onClick={() => markTaskAsDone(index)}
                    ></i>
                    <i
                      class="bx bx-minus bg-red-500 text-white p-3 rounded justify-center items-center"
                      onClick={() => deleteTask(index)}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-[400px] h-[70px] p-2 border-b-[1px] border-gray-500">
            <input
              ref={inputRef}
              type="text"
              placeholder="Nový úkol..."
              className="outline-none w-full h-[70px]"
              id="input-tasks"
            />
            <p
              className="bg-yellow-500 rounded-full w-14 h-12 flex justify-center items-center text-white text-4xl cursor-pointer"
              onClick={addNewTask}
            >
              +
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
