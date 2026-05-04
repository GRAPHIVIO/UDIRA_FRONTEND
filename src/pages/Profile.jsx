import React, { useState } from 'react';
import { Mail, Phone, Calendar, MapPin, Shield, Edit2, Save } from 'lucide-react';
import { Button, Badge } from '../components/shared';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="px-4 lg:px-8 py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 size={18} />
            Edit Profile
          </Button>
        ) : (
          <Button onClick={handleSave} variant="primary">
            <Save size={18} />
            Save Changes
          </Button>
        )}
      </div>

      {/* Profile Header */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 pb-8 border-b border-gray-200">
          <div className="relative group">
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-24 h-24 rounded-full border-4 border-primary-600 object-cover"
            />
            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Edit2 size={24} className="text-white" />
              </label>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
              <Badge variant="primary" size="sm" className="capitalize">{formData.role}</Badge>
            </div>
            <p className="text-gray-600">{formData.email}</p>
            <p className="text-sm text-gray-500 mt-1">Joined {new Date(formData.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900">{formData.name}</p>
                )}
              </div>
              <div>
                <label className="label">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Mail size={16} className="text-primary-600" />
                    {formData.email}
                  </div>
                )}
              </div>
              <div>
                <label className="label">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-900">
                    <Phone size={16} className="text-primary-600" />
                    {formData.phone}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Role</label>
                <div className="flex items-center gap-2 text-sm">
                  <Shield size={16} className="text-primary-600" />
                  <Badge variant="primary" size="sm" className="capitalize">{formData.role}</Badge>
                </div>
              </div>
              <div>
                <label className="label">Account Status</label>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              <div>
                <label className="label">Join Date</label>
                <div className="flex items-center gap-2 text-sm text-gray-900">
                  <Calendar size={16} className="text-primary-600" />
                  {new Date(formData.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="card mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
            </div>
            <Button size="sm" variant="secondary">Change</Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Button size="sm" variant="secondary">Enable</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
