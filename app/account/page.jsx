
// "use client"
// import React, { useState } from 'react';
// import {
//      User,
//      Package,
//      MapPin,
//      Settings,
//      LogOut,
//      ChevronRight,
//      ExternalLink,
//      CreditCard,
//      Bell,
//      Heart,
//      ChevronLeft
// } from 'lucide-react';
// import { signOut } from "next-auth/react";

// const page = () => {
//      const [activeTab, setActiveTab] = useState('overview');

//      const orders = [
//           { id: '#AV-8921', date: 'Oct 12, 2024', status: 'Delivered', total: 240, items: 1 },
//           { id: '#AV-7742', date: 'Aug 04, 2024', status: 'Delivered', total: 405, items: 2 }
//      ];

//      const SidebarItem = ({ icon: Icon, label, id }) => (
//           <button
//                onClick={() => setActiveTab(id)}
//                className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 ${activeTab === id
//                          ? 'bg-bg-card border border-border-default shadow-sm text-text-primary'
//                          : 'text-text-muted hover:text-text-primary hover:bg-bg-subtle/50'
//                     }`}
//           >
//                <div className="flex items-center space-x-4">
//                     <Icon size={18} strokeWidth={activeTab === id ? 2 : 1.5} />
//                     <span className="text-ui font-bold uppercase tracking-widest text-[10px]">{label}</span>
//                </div>
//                {activeTab === id && <div className="w-1 h-4 bg-accent rounded-full" />}
//           </button>
//      );

//      return (
//           <div className="min-h-screen bg-bg-page font-sans text-text-primary selection:bg-accent">
//                {/* Account Header */}
//                <header className="border-b border-border-default bg-bg-page/80 backdrop-blur-md sticky top-0 z-50">
//                     <div className="max-w-7xl mx-auto px-page-x h-20 flex justify-between items-center">
//                          <button className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
//                               <ChevronLeft size={14} />
//                               <span>Back to Shop</span>
//                          </button>
//                          <h1 className="text-xl font-headline tracking-[0.4em] uppercase font-bold">AVOIRE</h1>
//                          <div className="flex items-center space-x-4">
//                               <div className="w-8 h-8 rounded-full bg-accent text-text-inverse flex items-center justify-center text-[10px] font-bold">
//                                    JS
//                               </div>
//                          </div>
//                     </div>
//                </header>

//                <main className="max-w-7xl mx-auto px-page-x py-16 lg:py-24">
//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

//                          {/* Left: Account Navigation */}
//                          <div className="lg:col-span-3 space-y-8">
//                               <div className="pb-8 border-b border-border-subtle">
//                                    <h2 className="text-headline font-headline mb-1">Julian Schmidt</h2>
//                                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-disabled">Member since 2023</p>
//                               </div>

//                               <nav className="space-y-2">
//                                    <SidebarItem icon={User} label="Personal Profile" id="overview" />
//                                    <SidebarItem icon={Package} label="Order History" id="orders" />
//                                    <SidebarItem icon={MapPin} label="Addresses" id="addresses" />
//                                    <SidebarItem icon={Heart} label="My Collection" id="wishlist" />
//                                    <SidebarItem icon={CreditCard} label="Payment Methods" id="payment" />
//                                    <SidebarItem icon={Settings} label="Preferences" id="settings" />

//                                    <div className="pt-8">
//                                         <button
//                                              onClick={() => signOut()} className="w-full flex items-center space-x-4 px-6 py-4 text-text-muted hover:text-red-500 transition-colors">
//                                              <LogOut size={18} strokeWidth={1.5} />
//                                              <span className="text-ui font-bold uppercase tracking-widest text-[10px]">Sign Out</span>
//                                         </button>
//                                    </div>
//                               </nav>
//                          </div>

//                          {/* Right: Content Area */}
//                          <div className="lg:col-span-9">
//                               {activeTab === 'overview' && (
//                                    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
//                                         <section>
//                                              <div className="flex justify-between items-end mb-8">
//                                                   <h3 className="text-headline font-headline uppercase tracking-widest text-lg">Personal Details</h3>
//                                                   <button className="text-[10px] font-bold underline uppercase tracking-widest">Edit</button>
//                                              </div>
//                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                                   <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
//                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Full Name</p>
//                                                        <p className="text-ui font-medium">Julian Schmidt</p>
//                                                   </div>
//                                                   <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
//                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Email Address</p>
//                                                        <p className="text-ui font-medium">j.schmidt@atelier.com</p>
//                                                   </div>
//                                                   <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
//                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Phone Number</p>
//                                                        <p className="text-ui font-medium">+49 176 2931 0021</p>
//                                                   </div>
//                                                   <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
//                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Date of Birth</p>
//                                                        <p className="text-ui font-medium">14 November, 1992</p>
//                                                   </div>
//                                              </div>
//                                         </section>

//                                         <section className="pt-12 border-t border-border-subtle">
//                                              <h3 className="text-headline font-headline uppercase tracking-widest text-lg mb-8">Security</h3>
//                                              <div className="p-8 bg-bg-card border border-border-default rounded-2xl flex items-center justify-between">
//                                                   <div className="space-y-1">
//                                                        <p className="text-ui font-bold">Password</p>
//                                                        <p className="text-caption text-text-muted">Last changed 4 months ago</p>
//                                                   </div>
//                                                   <button className="px-6 py-2 border border-border-strong rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-text-inverse transition-all">
//                                                        Update
//                                                   </button>
//                                              </div>
//                                         </section>
//                                    </div>
//                               )}

//                               {activeTab === 'orders' && (
//                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//                                         <div className="flex justify-between items-center mb-8">
//                                              <h3 className="text-headline font-headline uppercase tracking-widest text-lg">Order History</h3>
//                                              <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Showing {orders.length} orders</p>
//                                         </div>

//                                         <div className="space-y-4">
//                                              {orders.map((order) => (
//                                                   <div key={order.id} className="p-8 bg-bg-card border border-border-default rounded-2xl flex flex-wrap items-center justify-between gap-6 hover:shadow-lg transition-shadow">
//                                                        <div className="space-y-1">
//                                                             <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled">Order ID</p>
//                                                             <p className="text-ui font-bold">{order.id}</p>
//                                                        </div>
//                                                        <div className="space-y-1">
//                                                             <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled">Date</p>
//                                                             <p className="text-ui">{order.date}</p>
//                                                        </div>
//                                                        <div className="space-y-1">
//                                                             <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled">Total Amount</p>
//                                                             <p className="text-ui font-bold">${order.total.toFixed(2)}</p>
//                                                        </div>
//                                                        <div className="flex items-center space-x-3">
//                                                             <span className="w-2 h-2 rounded-full bg-green-500" />
//                                                             <p className="text-[10px] font-bold uppercase tracking-widest">{order.status}</p>
//                                                        </div>
//                                                        <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest border-b border-border-strong pb-1 hover:text-accent transition-colors">
//                                                             <span>Details</span>
//                                                             <ChevronRight size={12} />
//                                                        </button>
//                                                   </div>
//                                              ))}
//                                         </div>
//                                    </div>
//                               )}

//                               {/* Default Placeholder for other tabs */}
//                               {!['overview', 'orders'].includes(activeTab) && (
//                                    <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center animate-in fade-in duration-700">
//                                         <div className="w-20 h-20 bg-bg-subtle rounded-full flex items-center justify-center text-text-disabled">
//                                              <Bell size={32} strokeWidth={1} />
//                                         </div>
//                                         <div className="space-y-2">
//                                              <h3 className="text-xl font-headline uppercase tracking-widest">Section under curation</h3>
//                                              <p className="text-text-muted text-ui font-light max-w-xs">We are currently refining this part of the atelier experience.</p>
//                                         </div>
//                                    </div>
//                               )}
//                          </div>
//                     </div>
//                </main>

//                <footer className="py-12 border-t border-border-subtle text-center opacity-40">
//                     <p className="text-[9px] font-bold tracking-[0.5em] text-text-disabled uppercase">
//                          Support & Concierge: +44 20 7946 0123
//                     </p>
//                </footer>
//           </div>
//      );
// };

// export default page;

// "use client";
// import { useSession } from "next-auth/react";

// const AccountPage = () => {
//      const { data: session } = useSession();

//      if (!session) return <p>Loading...</p>;

//      const { profile } = session.user;

//      return (
//           <>
//           <div className="min-h-screen px-8 py-12 bg-bg-page">
//                <h1 className="text-2xl font-bold mb-6">Your Account</h1>

//                <div className="space-y-4">
//                     <p><strong>Name:</strong> {profile.name}</p>
//                     <p><strong>Email:</strong> {profile.email}</p>
//                     <p><strong>Phone:</strong> {profile.phone || "Not set"}</p>

//                     <div>
//                          <strong>Addresses:</strong>
//                          {profile.addresses.length === 0 ? (
//                               <p>No addresses yet</p>
//                          ) : (
//                               <ul className="list-disc ml-5">
//                                    {profile.addresses.map((addr, i) => <li key={i}>{addr}</li>)}
//                               </ul>
//                          )}
//                     </div>
//                </div>
//           </div>
//           </>
//      );
// };

// export default AccountPage;


"use client"
import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import {
     User,
     Package,
     MapPin,
     Settings,
     LogOut,
     ChevronRight,
     Bell,
     Heart,
     CreditCard,
     ChevronLeft
} from 'lucide-react';

const AccountPage = () => {
     const { data: session, update } = useSession();
     const [activeTab, setActiveTab] = useState('overview');
     const [editing, setEditing] = useState(false);
     const [formData, setFormData] = useState({});

     // always call hooks first
     React.useEffect(() => {
          if (!session?.user?.profile) return;

          const { profile } = session.user;

          setFormData({
               name: profile.name || '',
               phone: profile.phone || '',
               addresses: profile.addresses || []
          });
     }, [session]);

     // THEN conditional render
     if (!session) return <p className="p-8">Loading...</p>;

     const { profile } = session.user;
     const handleChange = (e, index = null) => {
          const { name, value } = e.target;
          if (name === "addresses" && index !== null) {
               const updated = [...formData.addresses];
               updated[index] = value;
               setFormData({ ...formData, addresses: updated });
          } else {
               setFormData({ ...formData, [name]: value });
          }
     };

     const handleUpdate = async () => {
          try {
               const res = await fetch('/api/user/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
               });
               const data = await res.json();
               if (data.success) {
                    setEditing(false);
                    // Refresh session to reflect updated profile
                    update();
               }
          } catch (err) {
               console.error(err);
          }
     };

     const orders = [
          { id: '#AV-8921', date: 'Oct 12, 2024', status: 'Delivered', total: 240, items: 1 },
          { id: '#AV-7742', date: 'Aug 04, 2024', status: 'Delivered', total: 405, items: 2 }
     ];

     const SidebarItem = ({ icon: Icon, label, id }) => (
          <button
               onClick={() => setActiveTab(id)}
               className={`w-full flex items-center justify-between px-6 py-4 rounded-xl transition-all duration-300 ${activeTab === id
                    ? 'bg-bg-card border border-border-default shadow-sm text-text-primary'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-subtle/50'
                    }`}
          >
               <div className="flex items-center space-x-4">
                    <Icon size={18} strokeWidth={activeTab === id ? 2 : 1.5} />
                    <span className="text-ui font-bold uppercase tracking-widest text-[10px]">{label}</span>
               </div>
               {activeTab === id && <div className="w-1 h-4 bg-accent rounded-full" />}
          </button>
     );

     return (
          <div className="min-h-screen bg-bg-page font-sans text-text-primary selection:bg-accent">
               {/* Account Header */}
               <header className="border-b border-border-default bg-bg-page/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-page-x h-20 flex justify-between items-center">
                         <button className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
                              <ChevronLeft size={14} />
                              <span>Back to Shop</span>
                         </button>
                         <h1 className="text-xl font-headline tracking-[0.4em] uppercase font-bold">AVOIRE</h1>
                         <div className="flex items-center space-x-4">
                              <div className="w-8 h-8 rounded-full bg-accent text-text-inverse flex items-center justify-center text-[10px] font-bold">
                                   {profile.name?.split(' ').map(n => n[0]).join('') || 'JS'}
                              </div>
                         </div>
                    </div>
               </header>

               <main className="max-w-7xl mx-auto px-page-x py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                         {/* Left: Account Navigation */}
                         <div className="lg:col-span-3 space-y-8">
                              <div className="pb-8 border-b border-border-subtle">
                                   <h2 className="text-headline font-headline mb-1">{profile.name}</h2>
                                   <p className="text-[10px] font-bold uppercase tracking-widest text-text-disabled">Member since {new Date(profile.createdAt).getFullYear()}</p>
                              </div>

                              <nav className="space-y-2">
                                   <SidebarItem icon={User} label="Personal Profile" id="overview" />
                                   <SidebarItem icon={Package} label="Order History" id="orders" />
                                   <SidebarItem icon={MapPin} label="Addresses" id="addresses" />
                                   <SidebarItem icon={Heart} label="My Collection" id="wishlist" />
                                   <SidebarItem icon={CreditCard} label="Payment Methods" id="payment" />

                                   <div className="pt-8">
                                        <button
                                             onClick={() => signOut({callbackUrl:"/"})} className="w-full flex items-center space-x-4 px-6 py-4 text-text-muted hover:text-red-500 transition-colors">
                                             <LogOut size={18} strokeWidth={1.5} />
                                             <span className="text-ui font-bold uppercase tracking-widest text-[10px]">Sign Out</span>
                                        </button>
                                   </div>
                              </nav>
                         </div>

                         {/* Right: Overview with edit/update */}
                         <div className="lg:col-span-9">
                              {activeTab === 'overview' && (
                                   <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <section>
                                             <div className="flex justify-between items-end mb-8">
                                                  <h3 className="text-headline font-headline uppercase tracking-widest text-lg">Personal Details</h3>
                                                  <button
                                                       onClick={() => setEditing(!editing)}
                                                       className="text-[10px] font-bold underline uppercase tracking-widest">
                                                       {editing ? 'Cancel' : 'Edit'}
                                                  </button>
                                             </div>

                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                  {/* Name */}
                                                  <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
                                                       <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Full Name</p>
                                                       {editing ? (
                                                            <input
                                                                 type="text"
                                                                 name="name"
                                                                 value={formData.name}
                                                                 onChange={handleChange}
                                                                 className="text-ui font-medium w-full bg-bg-card border border-border-subtle rounded-md p-2"
                                                            />
                                                       ) : <p className="text-ui font-medium">{profile.name}</p>}
                                                  </div>

                                                  {/* Phone */}
                                                  <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
                                                       <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Phone Number</p>
                                                       {editing ? (
                                                            <input
                                                                 type="text"
                                                                 name="phone"
                                                                 value={formData.phone}
                                                                 onChange={handleChange}
                                                                 className="text-ui font-medium w-full bg-bg-card border border-border-subtle rounded-md p-2"
                                                            />
                                                       ) : <p className="text-ui font-medium">{profile.phone || 'Not set'}</p>}
                                                  </div>

                                                  {/* Addresses */}
                                                  <div className="p-6 bg-bg-card border border-border-default rounded-2xl">
                                                       <p className="text-[9px] font-bold uppercase tracking-widest text-text-disabled mb-1">Addresses</p>
                                                       {editing ? (
                                                            <div className="space-y-2">
                                                                 {formData.addresses.map((addr, i) => (
                                                                      <input
                                                                           key={i}
                                                                           type="text"
                                                                           name="addresses"
                                                                           value={addr}
                                                                           onChange={(e) => handleChange(e, i)}
                                                                           className="text-ui font-medium w-full bg-bg-card border border-border-subtle rounded-md p-2"
                                                                      />
                                                                 ))}
                                                                 <button
                                                                      onClick={() => setFormData({ ...formData, addresses: [...formData.addresses, ''] })}
                                                                      className="px-3 py-1 border border-border-strong rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-text-inverse transition-all mt-2">
                                                                      Add Address
                                                                 </button>
                                                            </div>
                                                       ) : (
                                                            <ul className="list-disc ml-5 text-ui font-medium">
                                                                 {profile.addresses.map((addr, i) => <li key={i}>{addr}</li>)}
                                                            </ul>
                                                       )}
                                                  </div>
                                             </div>

                                             {/* Save Button */}
                                             {editing && (
                                                  <div className="pt-6">
                                                       <button
                                                            onClick={handleUpdate}
                                                            className="px-6 py-3 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
                                                            Save Changes
                                                       </button>
                                                  </div>
                                             )}
                                        </section>
                                   </div>
                              )}
                         </div>
                    </div>
               </main>
          </div>
     );
};

export default AccountPage;