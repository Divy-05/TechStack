import React from 'react';
// import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Users, BookOpen, ClipboardList, Calendar, DollarSign, Bell, 
  Cloud, Shield, BarChart2, UserCircle, LayoutDashboard, 
  FileText, Smartphone, LifeBuoy, Sun, Moon 
} from 'lucide-react';

import Navbar from '../components/Common/Navbar';
import Footer from '../components/Common/Footer';

const Home = () => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  // Feature sections
  const primaryFeatures = [
    { icon: <Users className="h-6 w-6" />, title: "Role-Based User Management", description: "Assign different access levels and permissions to administrators, teachers, and staff members." },
    { icon: <BookOpen className="h-6 w-6" />, title: "Student & Teacher Tracking", description: "Manage complete profiles with academic history, contact information, and performance metrics." },
    { icon: <ClipboardList className="h-6 w-6" />, title: "Attendance Monitoring", description: "Track student attendance with automated notifications for absences and patterns." },
    { icon: <Calendar className="h-6 w-6" />, title: "Exam Scheduling", description: "Create and manage examination timetables with automated reminders for students." },
    { icon: <DollarSign className="h-6 w-6" />, title: "Fee Management", description: "Process payments, generate invoices, and maintain financial records effortlessly." },
    { icon: <Bell className="h-6 w-6" />, title: "Automated Reminders", description: "Send timely notifications for fee dues, upcoming exams, and important events." }
  ];

  const uniqueFeatures = [
    { icon: <UserCircle className="h-6 w-6" />, title: "Multi-Admin Management", description: "Delegate responsibilities across multiple administrators with customized access controls." },
    { icon: <Cloud className="h-6 w-6" />, title: "Bulk Data Upload", description: "Import existing student records, timetables, and academic data with a few clicks." },
    { icon: <BarChart2 className="h-6 w-6" />, title: "Automated Performance Tracking", description: "Generate insights on student progress and identify areas needing improvement." },
    { icon: <Shield className="h-6 w-6" />, title: "Enhanced Security & Privacy", description: "Protect sensitive information with advanced encryption and compliance measures." }
  ];

  return (
    <>
      {/* <Helmet>
        <title>TeechTrack | Comprehensive Tuition Management Software</title>
        <meta name="description" content="Streamline operations for educational institutions with TeechTrack's all-in-one tuition management software featuring attendance tracking, fee management, exam scheduling, and more." />
        <meta name="keywords" content="tuition management software, educational institution software, coaching institute management, student tracking system, fee management software, attendance monitoring system, exam scheduler, educational administration tools, academic performance tracking, tuition center software" />
        <meta property="og:title" content="TeechTrack | Comprehensive Tuition Management Software" />
        <meta property="og:description" content="All-in-one solution for tuition centers and coaching institutes to manage students, teachers, fees, attendance, and performance tracking." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://teechtrack.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TeechTrack | Tuition Management Software" />
        <meta name="twitter:description" content="Streamline your educational institution with our comprehensive management solution." />
        <link rel="canonical" href="https://teechtrack.com" />
      </Helmet> */}

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section 
        className="py-7 md:py-7 border-b" 
        style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', borderColor: 'var(--border-color)' }}
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--text-color)' }}>
              Transform Your Educational Institution with <span style={{ color: 'var(--primary-color)' }}>TeechTrack</span>
            </h1>
            <p className="text-xl mb-8" style={{ color: 'var(--text-color)' }}>
              The comprehensive tuition management software designed to streamline operations, enhance productivity, and improve learning outcomes.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/demo" 
                className="font-medium px-6 py-3 rounded-lg text-center transition duration-300 hover:opacity-90"
                style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)' }}
              >
                Request Demo
              </Link>
              <Link 
                to="/pricing" 
                className="border-2 px-6 py-3 rounded-lg text-center transition duration-300 hover:opacity-90"
                style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
              >
                View Pricing
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="relative">
              <div className="rounded-lg shadow-xl p-2" style={{ backgroundColor: 'var(--card-bg)' }}>
                <img 
                  src="/258699-P4T0HC-922.jpg" 
                  alt="TeechTrack Dashboard Preview" 
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Features Section */}
      <section 
        className="py-16 border-b" 
        style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', borderColor: 'var(--border-color)' }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>Comprehensive Management Features</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-color)' }}>
              TeechTrack offers a complete suite of tools to manage every aspect of your educational institution.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {primaryFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
                style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
              >
                <div className="rounded-full w-12 h-12 flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--button-text)' }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-color)' }}>{feature.title}</h3>
                <p className="text-gray-600" style={{ color: 'var(--text-color)' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section 
        className="py-16 border-b" 
        style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)', borderColor: 'var(--border-color)' }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Institutions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-200">Students Managed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">35%</div>
              <div className="text-blue-200">Admin Time Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Features Section */}
      <section 
        className="py-16 border-b" 
        style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', borderColor: 'var(--border-color)' }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-color)' }}>What Makes TeechTrack Different</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-color)' }}>
              Our unique features set us apart from other management systems.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {uniqueFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="rounded-full w-12 h-12 flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--button-text)' }}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-color)' }}>{feature.title}</h3>
                  <p className="text-gray-600" style={{ color: 'var(--text-color)' }}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section 
        className="py-16 border-b" 
        style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)', borderColor: 'var(--border-color)' }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="relative">
                <div className="rounded-lg shadow-xl p-2" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <img 
                    src="https://img.freepik.com/free-vector/online-learning-isometric-concept_1284-17947.jpg" 
                    alt="TeechTrack Features Preview" 
                    className="rounded"
                  />
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-color)' }}>
                Designed with Educators in Mind
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="rounded-full p-1 mr-4 mt-1" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <LayoutDashboard className="w-4 h-4" style={{ color: 'var(--button-text)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-color)' }}>Intuitive Interface</h3>
                    <p className="text-gray-600" style={{ color: 'var(--text-color)' }}>Minimal learning curve with our user-friendly dashboard design.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full p-1 mr-4 mt-1" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <FileText className="w-4 h-4" style={{ color: 'var(--button-text)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-color)' }}>Data Migration Support</h3>
                    <p className="text-gray-600" style={{ color: 'var(--text-color)' }}>Our team helps transfer your existing records to the TeechTrack system.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full p-1 mr-4 mt-1" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <Smartphone className="w-4 h-4" style={{ color: 'var(--button-text)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-color)' }}>Mobile Friendly</h3>
                    <p className="text-gray-600" style={{ color: 'var(--text-color)' }}>Access TeechTrack from any device, anywhere, anytime.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="rounded-full p-1 mr-4 mt-1" style={{ backgroundColor: 'var(--primary-color)' }}>
                    <LifeBuoy className="w-4 h-4" style={{ color: 'var(--button-text)' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: 'var(--text-color)' }}>24/7 Support</h3>
                    <p className="text-gray-600" style={{ color: 'var(--text-color)' }}>Our dedicated team is available around the clock to assist you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section 
        className="py-16" 
        style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Institution?</h2>
          <p className="text-xl mb-8">Join hundreds of institutions already using TeechTrack to streamline their operations.</p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/signup" 
              className="font-medium px-6 py-3 rounded-lg transition duration-300"
              style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)' }}
            >
              Get Started
            </Link>
            <Link 
              to="/demo" 
              className="border-2 px-6 py-3 rounded-lg transition duration-300"
              style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;