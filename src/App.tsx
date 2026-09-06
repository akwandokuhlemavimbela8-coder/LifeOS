import { motion, AnimatePresence } from 'framer-motion';

// Wrap your tab content renderer with AnimatePresence
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.2, ease: 'easeInOut' }}
  >
    {/* Active Tab View Component */}
  </motion.div>
</AnimatePresence>
