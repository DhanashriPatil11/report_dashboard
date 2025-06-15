import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import { Plus, MoreHorizontal, Clock, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const TaskCard = ({ task, columnId, moveTask }) => {
  const { theme } = useTheme();
  
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return theme.error;
      case 'medium':
        return theme.warning;
      case 'low':
        return theme.success;
      default:
        return theme.textSecondary;
    }
  };

  return (
    <div
      ref={drag}
      className={`p-4 rounded-lg cursor-move transition-all duration-200 ${
        isDragging ? 'opacity-50 transform rotate-3' : 'hover:shadow-md'
      }`}
      style={{
        backgroundColor: theme.background,
        border: `1px solid ${theme.border}`,
        boxShadow: `0 1px 3px ${theme.shadow}`
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-sm" style={{ color: theme.text }}>
          {task.title}
        </h4>
        <button className="p-1 rounded hover:bg-opacity-80" style={{ backgroundColor: theme.surfaceAlt }}>
          <MoreHorizontal className="w-4 h-4" style={{ color: theme.textSecondary }} />
        </button>
      </div>
      
      <p className="text-xs mb-3" style={{ color: theme.textSecondary }}>
        {task.description}
      </p>

      {task.tags && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full"
              style={{
                backgroundColor: theme.primary + '20',
                color: theme.primary
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {task.assignee && (
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
              style={{ backgroundColor: theme.primary }}
            >
              {task.assignee.charAt(0)}
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center space-x-1 text-xs" style={{ color: theme.textSecondary }}>
              <Clock className="w-3 h-3" />
              <span>{task.dueDate}</span>
            </div>
          )}
        </div>
        
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        />
      </div>
    </div>
  );
};

const Column = ({ column, tasks, moveTask }) => {
  const { theme } = useTheme();
  
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => {
      if (item.columnId !== column.id) {
        moveTask(item.id, item.columnId, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getColumnColor = (status) => {
    switch (status) {
      case 'todo':
        return theme.textSecondary;
      case 'in-progress':
        return theme.warning;
      case 'review':
        return theme.accent;
      case 'done':
        return theme.success;
      default:
        return theme.primary;
    }
  };

  return (
    <div
      ref={drop}
      className={`p-4 rounded-xl transition-colors ${isOver ? 'ring-2' : ''}`}
      style={{
        backgroundColor: theme.surface,
        ringColor: theme.primary,
        minHeight: '500px'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getColumnColor(column.id) }}
          />
          <h3 className="font-semibold" style={{ color: theme.text }}>
            {column.title}
          </h3>
          <span 
            className="px-2 py-1 text-xs rounded-full"
            style={{
              backgroundColor: theme.surfaceAlt,
              color: theme.textSecondary
            }}
          >
            {tasks.length}
          </span>
        </div>
        <button 
          className="p-1 rounded hover:bg-opacity-80"
          style={{ backgroundColor: theme.surfaceAlt }}
        >
          <Plus className="w-4 h-4" style={{ color: theme.text }} />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            columnId={column.id}
            moveTask={moveTask}
          />
        ))}
      </div>
    </div>
  );
};

const Kanban = () => {
  const { theme } = useTheme();
  
  const [columns] = useState([
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'review', title: 'Review' },
    { id: 'done', title: 'Done' },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Design System Update',
      description: 'Update the design system with new components and guidelines',
      columnId: 'todo',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: 'Dec 25',
      tags: ['Design', 'UI/UX']
    },
    {
      id: '2',
      title: 'API Integration',
      description: 'Integrate payment gateway API with the checkout flow',
      columnId: 'in-progress',
      priority: 'medium',
      assignee: 'Jane Smith',
      dueDate: 'Dec 28',
      tags: ['Backend', 'API']
    },
    {
      id: '3',
      title: 'User Authentication',
      description: 'Implement OAuth 2.0 authentication for user login',
      columnId: 'review',
      priority: 'high',
      assignee: 'Mike Johnson',
      dueDate: 'Dec 30',
      tags: ['Security', 'Auth']
    },
    {
      id: '4',
      title: 'Dashboard Analytics',
      description: 'Create analytics dashboard with charts and metrics',
      columnId: 'done',
      priority: 'low',
      assignee: 'Sarah Wilson',
      dueDate: 'Dec 20',
      tags: ['Analytics', 'Charts']
    },
    {
      id: '5',
      title: 'Mobile Responsive',
      description: 'Make the application fully responsive for mobile devices',
      columnId: 'todo',
      priority: 'medium',
      assignee: 'David Brown',
      dueDate: 'Jan 5',
      tags: ['Mobile', 'CSS']
    },
  ]);

  const moveTask = (taskId, fromColumnId, toColumnId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, columnId: toColumnId } : task
      )
    );
  };

  const getTasksByColumn = (columnId) => {
    return tasks.filter(task => task.columnId === columnId);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: theme.text }}>
              Kanban Board
            </h1>
            <p className="mt-2" style={{ color: theme.textSecondary }}>
              Organize and track your team's work with drag-and-drop simplicity
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 rounded-lg border transition-colors hover:bg-opacity-80"
              style={{ 
                borderColor: theme.border,
                backgroundColor: theme.surface,
                color: theme.text 
              }}
            >
              Filter
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.primary }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map(column => {
            const columnTasks = getTasksByColumn(column.id);
            return (
              <div 
                key={column.id}
                className="p-4 rounded-lg"
                style={{ backgroundColor: theme.surface }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium" style={{ color: theme.text }}>
                    {column.title}
                  </h3>
                  <span className="text-2xl font-bold" style={{ color: theme.primary }}>
                    {columnTasks.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map(column => (
            <Column
              key={column.id}
              column={column}
              tasks={getTasksByColumn(column.id)}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default Kanban;