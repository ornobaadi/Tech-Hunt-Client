import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-100 to-indigo-100 overflow-hidden relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            About Our Platform
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            We connect innovators with early adopters, making technology discovery accessible to everyone.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-all"
          >
            Join Our Community
          </motion.button>
        </motion.div>
        
        {/* Abstract shapes in background */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-20 -right-16 w-80 h-80 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2"
            >
              <div className="inline-block mb-3 px-4 py-1 bg-blue-100 text-blue-800 rounded-full font-medium text-sm">
                Our Purpose
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We believe great products should be discovered based on merit, not marketing budgets. Our platform creates a space where innovation thrives regardless of resources.
              </p>
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start p-3 bg-white rounded-lg shadow-sm"
                >
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  <span>Creators gain visibility without massive marketing spend</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start p-3 bg-white rounded-lg shadow-sm"
                >
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  <span>Users discover useful tools before they go mainstream</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start p-3 bg-white rounded-lg shadow-sm"
                >
                  <span className="text-blue-500 mr-3 text-xl">✓</span>
                  <span>Community curation ensures quality rises to the top</span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-20 blur-xl"></div>
                <img
                  src="/api/placeholder/500/300"
                  alt="Our mission illustration"
                  className="rounded-xl shadow-xl relative"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Grid Section */}
      <ValuesGrid />

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-4 py-1 bg-indigo-100 text-indigo-800 rounded-full font-medium text-sm"
            >
              Our Experts
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Meet Our Team
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Passionate individuals committed to transforming how we discover technology
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Alex Rivera"
              role="Founder & CEO"
              image="/api/placeholder/200/200"
            />
            <TeamMember
              name="Mei Zhang"
              role="CTO"
              image="/api/placeholder/200/200"
            />
            <TeamMember
              name="Jay Patel"
              role="Head of Community"
              image="/api/placeholder/200/200"
            />
            <TeamMember
              name="Sophia Chen"
              role="Product Design"
              image="/api/placeholder/200/200"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Component for Values Grid
const ValuesGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3 px-4 py-1 bg-purple-100 text-purple-800 rounded-full font-medium text-sm">
            What We Stand For
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
          <p className="text-base-content/70 max-w-3xl mx-auto text-gray-600">
            The principles that guide our platform, community, and team.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ValueCard
            number="01"
            title="Meritocratic Discovery"
            description="We believe the best tech should rise based on quality, not marketing spend."
            color="bg-blue-500"
          />
          
          <ValueCard
            number="02"
            title="Constructive Feedback"
            description="Our community thrives on helpful, actionable feedback that improves products."
            color="bg-purple-500"
          />
          
          <ValueCard
            number="03"
            title="Inclusive Innovation"
            description="We level the playing field for creators of all backgrounds and resources."
            color="bg-pink-500"
          />
          
          <ValueCard
            number="04"
            title="User Privacy First"
            description="We never compromise on user privacy or data security practices."
            color="bg-green-500"
          />
          
          <ValueCard
            number="05"
            title="Transparent Curation"
            description="Our moderation and ranking processes are open and understandable."
            color="bg-yellow-500"
          />
          
          <ValueCard
            number="06"
            title="Continuous Evolution"
            description="We constantly improve our platform based on community needs."
            color="bg-red-500"
          />
        </div>
      </div>
    </section>
  );
};

// Component for Value Cards
const ValueCard = ({ number, title, description, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="group bg-base-100 border border-base-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
    >
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <span className={`text-sm font-mono font-bold text-white ${color} px-2 py-1 rounded`}>
            {number}
          </span>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
        </div>
        <p className="text-base-content/70 text-gray-600">{description}</p>
      </div>
      <div className={`h-1 w-full ${color} opacity-70 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300`}></div>
    </motion.div>
  );
};

// Enhanced Team Member Component
const TeamMember = ({ name, role, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center group"
    >
      <div className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
        <img
          src={image}
          alt={name}
          className="w-36 h-36 rounded-full mx-auto object-cover border-4 border-white shadow-lg group-hover:shadow-xl transition-all"
        />
      </div>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 mb-3">{role}</p>
      <div className="flex justify-center space-x-3">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </span>
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        </span>
      </div>
    </motion.div>
  );
};

export default About;