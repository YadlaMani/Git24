import { motion } from "framer-motion";

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function StatCard({ icon: Icon, title, value, color }) {
  return (
    <motion.div
      variants={item}
      className={`p-6 rounded-xl bg-opacity-10 backdrop-blur-lg ${color} shadow-lg`}
    >
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="w-5 h-5" />
        <h3 className="text-sm font-medium opacity-70">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
}
