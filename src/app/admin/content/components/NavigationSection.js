"use client";
import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline';

const NavItem = ({ 
  item,
  onUpdate, 
  onRemove, 
  onAddChild,
  onDragStart,
  onDragOver,
  onDrop,
  level = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="space-y-2">
      <div
        draggable={level === 0}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`border border-gray-200 rounded-lg p-4 bg-white ${level === 0 ? 'cursor-move' : ''} ${
          level > 0 ? 'ml-6 border-l-4 border-l-blue-200' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {hasChildren && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                )}
              </button>
            )}
            <input
              type="checkbox"
              checked={item.isActive}
              onChange={(e) => onUpdate('isActive', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Active</span>
            {level > 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Sub-menu
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {level === 0 && (
              <button
                onClick={onAddChild}
                className="text-green-600 hover:text-green-800 p-1"
                title="Add sub-menu"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={onRemove}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={item.name || ''}
              onChange={(e) => onUpdate('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
            <input
              type="text"
              value={item.href || ''}
              onChange={(e) => onUpdate('href', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 bg-white"
            />
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-2 mt-2">
          {item.children.map((child, childIndex) => (
            <NavItem
              key={child.id || `${item.id}-child-${childIndex}`}
              item={child}
              onUpdate={(field, value) => {
                const newChildren = [...item.children];
                newChildren[childIndex] = { ...child, [field]: value };
                onUpdate('children', newChildren);
              }}
              onRemove={() => {
                const newChildren = item.children.filter((_, i) => i !== childIndex);
                onUpdate('children', newChildren);
              }}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function NavigationSection({ content, onDataChange, saving }) {
  console.log(content)
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDataChange = (field, value) => {
    onDataChange({ ...content, [field]: value });
  };
  
  const handleItemChange = (index, field, value) => {
    const newItems = [...(content?.navigationItems || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    handleDataChange('navigationItems', newItems);
  };

  const addItem = () => {
    const newItems = [...(content?.navigationItems || []), {
      id: `${Date.now()}-new`,
      name: '',
      href: '',
      isActive: true,
      order: content?.navigationItems?.length || 0,
      children: []
    }];
    handleDataChange('navigationItems', newItems);
  };

  const removeItem = (index) => {
    const newItems = (content?.navigationItems || []).filter((_, i) => i !== index);
    handleDataChange('navigationItems', newItems);
  };

  const addChild = (parentIndex) => {
    const newItems = [...(content?.navigationItems || [])];
    const parent = newItems[parentIndex];
    if (!parent.children) parent.children = [];
    
    parent.children.push({
      id: `${Date.now()}-child-${parent.children.length}`,
      name: '',
      href: '',
      isActive: true,
      order: parent.children.length,
      children: []
    });
    
    handleDataChange('navigationItems', newItems);
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const items = [...(content?.navigationItems || [])];
    const [draggedItem] = items.splice(draggedIndex, 1);
    items.splice(dropIndex, 0, draggedItem);
    
    const updatedItems = items.map((item, index) => ({ ...item, order: index }));
    handleDataChange('navigationItems', updatedItems);
    setDraggedIndex(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Navigation</h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={content?.isActive ?? true}
              onChange={(e) => handleDataChange('isActive', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              disabled={saving}
            />
            <span className="ml-2 text-sm text-gray-700">Active</span>
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Navigation Items</h3>
            <button
              onClick={addItem}
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={saving}
            >
              Add Item
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop items to reorder them. Click the + button to add sub-menus to any main menu item.
          </p>

          <div className="space-y-4">
            {content?.navigationItems && content.navigationItems.map((item, index) => (
              <NavItem 
                key={item.id || `nav-item-${index}`}
                item={item}
                onUpdate={(field, value) => handleItemChange(index, field, value)}
                onRemove={() => removeItem(index)}
                onAddChild={() => addChild(index)}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              />
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Navigation Tips:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use &quot;/&quot; for the home page</li>
            <li>• Use &quot;/about-us&quot; for the about page</li>
            <li>• Use &quot;/tours&quot; for the tours page</li>
            <li>• Use &quot;/contact-us&quot; for the contact page</li>
            <li>• Order is managed by drag and drop</li>
            <li>• Click the + button to add sub-menus</li>
            <li>• Sub-menus are indented and have a blue left border</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 