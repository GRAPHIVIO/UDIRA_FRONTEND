import React from 'react';
import { Mail, Phone, Calendar, Shield, Users, Award } from 'lucide-react';
import { mockBOMMembers } from '../utils/mockData';
import { Badge } from '../components/shared';

export default function BOM() {
  return (
    <div className="px-4 lg:px-8 py-6 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Board of Management</h1>
        <p className="text-gray-600 mt-1">The governing body responsible for school oversight and strategic development.</p>
      </div>

      {/* Grid of Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBOMMembers.map((member) => (
          <div key={member.id} className="card group hover:shadow-xl transition-all duration-300 border-t-4 border-primary-600">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-full border-4 border-gray-100 object-cover bg-gray-50"
                />
                <div className="absolute -bottom-2 right-0 bg-primary-600 text-white p-1.5 rounded-full shadow-lg">
                  <Shield size={16} />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{member.name}</h3>
                <Badge variant="primary" className="mt-1 font-semibold">{member.role}</Badge>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed italic">
                "{member.description}"
              </p>

              <div className="w-full pt-4 space-y-3 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Mail size={16} className="text-primary-600" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Phone size={16} className="text-primary-600" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2 font-medium">
                  <Calendar size={14} />
                  <span>Serving since {member.since}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="card bg-primary-600 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Award size={28} />
            </div>
            <h3 className="text-2xl font-bold">Strategic Vision</h3>
          </div>
          <p className="text-primary-50 leading-relaxed mb-6">
            Our mission is to foster an environment of excellence where every student can achieve their full potential. 
            The Board of Management is committed to transparency, infrastructure growth, and academic integrity.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-white/10">
              <p className="text-xl font-bold text-white">98%</p>
              <p className="text-xs text-primary-100 uppercase tracking-wider">Success Rate</p>
            </div>
            <div className="p-3 rounded-lg bg-white/10">
              <p className="text-xl font-bold text-white">10+</p>
              <p className="text-xs text-primary-100 uppercase tracking-wider">Major Projects</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users size={20} className="text-primary-600" />
            BOM Responsibilities
          </h3>
          <ul className="space-y-4">
            {[
              "Strategic financial planning and budget approval.",
              "Infrastructure development and facility maintenance.",
              "Staff welfare and recruitment oversight.",
              "Ensuring adherence to Ministry of Education guidelines.",
              "Community engagement and stakeholder management."
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-600">
                <div className="w-5 h-5 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                  {i + 1}
                </div>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
