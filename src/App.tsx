import React, { useState } from 'react';
import { Plus, Edit2, ArrowRight, Menu, PlusCircle, FileText, Bell, CheckSquare, Package, Film } from 'lucide-react';

// Node types
type NodeType = 'start' | 'end' | 'task' | 'reminder';

// Node interface
interface WorkflowNode {
  id: string;
  type: NodeType;
  title: string;
  description?: string;
  items?: {
    icon: string;
    title: string;
    action: string;
  }[];
  position?: 'main' | 'side';
  parentId?: string;
}

function App() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'onboarding',
      type: 'task',
      title: 'Basic Onboarding',
      description: 'Runs automatically when a new user is added',
      position: 'main',
    },
    {
      id: 'start',
      type: 'start',
      title: 'Start',
      position: 'main',
    },
    {
      id: 'welcome',
      type: 'task',
      title: 'Welcome to Tesla',
      items: [
        { icon: 'document', title: 'Company Information', action: 'Visual Intro' },
        { icon: 'document', title: 'Company Information', action: 'Send Letter' },
      ],
      position: 'main',
    },
    {
      id: 'personal',
      type: 'task',
      title: 'Personal Details',
      items: [
        { icon: 'data', title: 'Data Collection', action: 'Basic Details' },
      ],
      position: 'main',
    },
    {
      id: 'reminder',
      type: 'reminder',
      title: 'Reminder Message',
      items: [
        { icon: 'whatsapp', title: 'WhatsApp', action: 'Remind' },
      ],
      position: 'side',
      parentId: 'personal',
    },
    {
      id: 'verifications',
      type: 'task',
      title: 'Verifications',
      items: [
        { icon: 'author', title: 'Author Verification', action: 'Welcome Message' },
        { icon: 'offer', title: 'Offer Letter', action: 'Welcome Message' },
        { icon: 'compliance', title: 'Compliance and Acknowledgement', action: 'Welcome Message' },
      ],
      position: 'main',
    },
    {
      id: 'kit',
      type: 'task',
      title: 'Onboarding Kit',
      items: [
        { icon: 'kit', title: 'Onboarding Kit', action: 'Basic Kit' },
      ],
      position: 'main',
    },
    {
      id: 'assets',
      type: 'task',
      title: 'Company Assets',
      items: [
        { icon: 'media', title: 'Media Library', action: 'Must Watch' },
      ],
      position: 'main',
    },
    {
      id: 'end',
      type: 'end',
      title: 'Ends',
      position: 'main',
    },
  ]);

  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [addingSideNode, setAddingSideNode] = useState<string | null>(null);

  const handleAddNode = () => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: 'task',
      title: 'New Task',
      items: [],
      position: 'main',
    };
    
    const endNodeIndex = nodes.findIndex(node => node.type === 'end');
    if (endNodeIndex !== -1) {
      const newNodes = [...nodes];
      newNodes.splice(endNodeIndex, 0, newNode);
      setNodes(newNodes);
    } else {
      setNodes([...nodes, newNode]);
    }
  };

  const handleAddSideNode = (parentId: string) => {
    const newSideNode: WorkflowNode = {
      id: `side-${Date.now()}`,
      type: 'reminder',
      title: 'New Side Task',
      items: [
        { icon: 'whatsapp', title: 'New Action', action: 'Action' },
      ],
      position: 'side',
      parentId,
    };
    
    setNodes([...nodes, newSideNode]);
    setAddingSideNode(null);
  };

  const getNodeIcon = (node: WorkflowNode) => {
    switch (node.type) {
      case 'start':
        return <ArrowRight className="w-4 h-4 text-white" />;
      case 'end':
        return <ArrowRight className="w-4 h-4 text-white" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-gray-700" />;
      default:
        return <CheckSquare className="w-5 h-5 text-gray-700" />;
    }
  };

  const getItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'document':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'data':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'whatsapp':
        return <div className="w-5 h-5 flex items-center justify-center rounded">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.5 0 0 4.5 0 10C0 11.8 0.5 13.5 1.3 15L0 20L5.1 18.7C6.6 19.5 8.2 19.9 10 19.9C15.5 19.9 20 15.4 20 9.9C20 7.3 19 4.8 17.1 2.9C15.2 1 12.7 0 10 0ZM15.8 14.1C15.6 14.7 14.6 15.3 14.1 15.4C13.6 15.5 13 15.5 12.4 15.4C12 15.3 11.5 15.1 10.9 14.9C8.7 14 7.2 11.8 7.1 11.7C7 11.6 6 10.3 6 8.9C6 7.5 6.7 6.8 7 6.5C7.3 6.2 7.6 6.1 7.8 6.1H8.4C8.6 6.1 8.8 6.1 9 6.5C9.2 7 9.7 8.4 9.7 8.5C9.8 8.6 9.8 8.8 9.7 8.9C9.6 9.1 9.5 9.2 9.4 9.4C9.3 9.5 9.1 9.7 9 9.8C8.9 9.9 8.7 10.1 8.9 10.4C9.1 10.7 9.7 11.7 10.6 12.5C11.7 13.5 12.6 13.8 12.9 13.9C13.2 14 13.4 14 13.6 13.8C13.8 13.6 14.3 13.1 14.5 12.8C14.7 12.5 14.9 12.5 15.2 12.6C15.5 12.7 16.9 13.4 17.2 13.5C17.5 13.6 17.7 13.7 17.8 13.8C17.9 14 17.9 14.5 17.7 15.1H15.8V14.1Z" fill="#25D366"/>
          </svg>
        </div>;
      case 'author':
        return <FileText className="w-5 h-5 text-yellow-600" />;
      case 'offer':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'compliance':
        return <CheckSquare className="w-5 h-5 text-blue-600" />;
      case 'kit':
        return <Package className="w-5 h-5 text-purple-600" />;
      case 'media':
        return <Film className="w-5 h-5 text-blue-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNodeColor = (node: WorkflowNode) => {
    switch (node.type) {
      case 'start':
        return 'bg-purple-600';
      case 'end':
        return 'bg-purple-600';
      case 'reminder':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  const mainNodes = nodes.filter(node => node.position !== 'side');
  const sideNodes = nodes.filter(node => node.position === 'side');

  const getNodePosition = (nodeId: string) => {
    const index = mainNodes.findIndex(node => node.id === nodeId);
    if (index === -1) return 0;
    

    let position = 180
    

    for (let i = 0; i < index; i++) {
      const prevNode = mainNodes[i];
      if (prevNode.type === 'start' || prevNode.type === 'end') {
        position += 80; 
      } else {
        const itemsCount = prevNode.items?.length || 0;
        position += 100 + (itemsCount * 40);
        if (prevNode.description) {
          position += 60;
        }
      }
    }
    
    return position;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto relative">
        <div className="relative flex flex-col items-center">
          {mainNodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <div className={`w-full max-w-md ${index === 0 ? 'mt-0' : 'mt-6'} relative`}>
                {node.type !== 'start' && node.type !== 'end' && (
                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 flex items-center">
                    <button
                      className="text-purple-500 hover:text-purple-700 z-10"
                      onClick={() => setAddingSideNode(node.id)}
                      title="Add side connection"
                    >
                      <PlusCircle className="w-6 h-6" />
                    </button>
                    
                    {sideNodes
                      .filter(sideNode => sideNode.parentId === node.id)
                      .map((sideNode) => (
                        <div 
                          key={sideNode.id} 
                          className="absolute left-8 flex items-center"
                          style={{ width: 'calc(100% - 8px)' }}
                        >
                          <div className="w-full h-0 border-t-2 border-dashed border-green-300"></div>
                          <div className="w-64">
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                              <div className="flex justify-between items-center p-3 border-b border-gray-100">
                                <div className="flex items-center space-x-2">
                                  <Bell className="w-5 h-5 text-gray-700" />
                                  <h3 className="font-medium text-gray-800">{sideNode.title}</h3>
                                </div>
                                <button 
                                  className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-100 text-gray-600"
                                  onClick={() => setEditingNode(sideNode.id)}
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                              
                              {sideNode.items && sideNode.items.length > 0 && (
                                <div className="p-3">
                                  {sideNode.items.map((item, itemIndex) => (
                                    <div 
                                      key={itemIndex} 
                                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                                    >
                                      <div className="flex items-center space-x-2">
                                        {getItemIcon(item.icon)}
                                        <span className="text-sm text-gray-700">{item.title}</span>
                                      </div>
                                      <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                        {item.action}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                
                {node.type === 'start' || node.type === 'end' ? (
                  <div className="flex justify-center">
                    <button 
                      className={`${node.type === 'start' ? 'bg-purple-600' : 'bg-purple-600'} text-white px-4 py-1 rounded-full flex items-center space-x-2`}
                    >
                      <span>{node.title}</span>
                      {node.type === 'start' && <ArrowRight className="w-4 h-4 ml-1" />}
                    </button>
                  </div>
                ) : (
                  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden`}>
                    <div className="flex justify-between items-center p-3 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        {getNodeIcon(node)}
                        <h3 className="font-medium text-gray-800">{node.title}</h3>
                      </div>
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600"
                        onClick={() => setEditingNode(node.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 11.5V14H4.5L11.8733 6.62667L9.37333 4.12667L2 11.5ZM13.8067 4.69333C14.0667 4.43333 14.0667 4.01333 13.8067 3.75333L12.2467 2.19333C11.9867 1.93333 11.5667 1.93333 11.3067 2.19333L10.0867 3.41333L12.5867 5.91333L13.8067 4.69333Z" fill="#64748B"/>
                        </svg>
                      </button>
                    </div>
                    
                    {node.description && (
                      <div className="p-3 bg-purple-50 text-sm">
                        {node.id === 'onboarding' && (
                          <>
                            <div className="flex gap-2 mb-2">
                              <span className="text-gray-600">Who:</span>
                              <div className="flex gap-1">
                                <span className="text-red-600">Employees - All</span>
                                <span className="text-red-600">Clients - All</span>
                                <span className="text-red-600">Locations - B</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-gray-600">When:</span>
                              <span>{node.description}</span>
                            </div>
                          </>
                        )}
                        {node.id !== 'onboarding' && node.description}
                      </div>
                    )}
                    
                    {node.items && node.items.length > 0 && (
                      <div className="p-3">
                        {node.items.map((item, itemIndex) => (
                          <div 
                            key={itemIndex} 
                            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-center space-x-3">
                              {getItemIcon(item.icon)}
                              <span className="text-sm text-gray-700">{item.title}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 14C4.7 14 2 11.3 2 8C2 4.7 4.7 2 8 2C11.3 2 14 4.7 14 8C14 11.3 11.3 14 8 14ZM9 4H7V9H12V7H9V4Z" fill="#94A3B8"/>
                              </svg>
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {item.action}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {index < mainNodes.length - 1 && (
                <div className="h-16 w-0 border-l-2 border-dashed border-purple-300"></div>
              )}
              
              {node.type !== 'end' && index === mainNodes.length - 2 && (
                <>
                  <div className="h-16 w-0 border-l-2 border-dashed border-purple-300"></div>
                  <button 
                    onClick={handleAddNode}
                    className="flex items-center justify-center text-purple-600 text-sm font-medium mb-6"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Another
                  </button>
                  <div className="h-16 w-0 border-l-2 border-dashed border-purple-300"></div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {editingNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Node</h2>
            <button 
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setEditingNode(null)}
            >
              ✕
            </button>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={nodes.find(n => n.id === editingNode)?.title || ''}
                onChange={(e) => {
                  setNodes(nodes.map(node => 
                    node.id === editingNode 
                      ? { ...node, title: e.target.value } 
                      : node
                  ));
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md"
                value={nodes.find(n => n.id === editingNode)?.description || ''}
                onChange={(e) => {
                  setNodes(nodes.map(node => 
                    node.id === editingNode 
                      ? { ...node, description: e.target.value } 
                      : node
                  ));
                }}
              />
            </div>
            <div className="flex justify-end">
              <button 
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                onClick={() => setEditingNode(null)}
              >
                Cancel
              </button>
              <button 
                className="bg-purple-600 text-white px-4 py-2 rounded-md"
                onClick={() => setEditingNode(null)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Side Node Modal */}
      {addingSideNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Side Connection</h2>
            <button 
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setAddingSideNode(null)}
            >
              ✕
            </button>
            <p className="mb-4 text-gray-600">
              Add a side connection to "{nodes.find(n => n.id === addingSideNode)?.title}"
            </p>
            <div className="flex justify-end">
              <button 
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-2"
                onClick={() => setAddingSideNode(null)}
              >
                Cancel
              </button>
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleAddSideNode(addingSideNode)}
              >
                Add Side Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;