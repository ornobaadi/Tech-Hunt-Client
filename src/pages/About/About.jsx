import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const About = () => {
  return (
    <div className="bg-gray-50">

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
              <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">Purpose</h4>
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
                  src="https://imageio.forbes.com/specials-images/imageserve/66fcdc589e002dcb85799ece/Discover-how-Hybrid-AI-is-revolutionizing-industries-by-combining-the-strengths-of/960x0.jpg?format=jpg&width=960"
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
          <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">Our Experts</h4>
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
              name="Ornob Aadi"
              role="Founder & CEO"
              image="https://i.ibb.co.com/HNkhYGc/00000-PORTRAIT-00000-BURST20190124113738260-2.jpg"
            />
            <TeamMember
              name="Abu Jafar"
              role="CTO"
              image="https://i.ibb.co.com/dJr1vX1r/IMG-20220709-023311-731.jpg"
            />
            <TeamMember
              name="Md. Fajlay Rabby"
              role="Head of Community"
              image="https://i.ibb.co.com/1XttHs2/IMG-20220107-150344-2.jpg"
            />
            <TeamMember
              name="Krypto"
              role="Product Designer"
              image="https://i.ibb.co.com/f8yV6G3/IMG-20220315-162332-2.jpg"
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
          <h4 className="btn pointer-events-none text-purple-500 uppercase text-sm font-bold my-5">What we stand for</h4>
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
      
    </motion.div>
  );
};

export default About;