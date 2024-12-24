import { NextPage } from "next";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import cn from "@/utils/cn";

const transition = {
  type: "spring",
  duration: 1,
  bounce: 0.2,
  ease: [0.4, 0, 0.2, 1],
};

const Home: NextPage = () => {
  // const router = useRouter();
  // const { id } = router.query;

  const [expand, setExpand] = useState(0);
  const allItems = useRef([
    {
      id: 1,
      class: "bg-white",
    },
    {
      id: 2,
      class: "bg-blue-600",
    },
    {
      id: 3,
      class: "bg-red-600",
    },
  ]);

  return (
    <AnimatePresence>
      <div className="fixed p-4 gap-4 flex justify-end items-end right-0 bottom-0 pointer-events-none">
        {allItems.current.map((item) => (
          <motion.div
            key={item.id}
            layout
            transition={transition}
            className={cn(
              "z-10 w-8 h-16 rounded pointer-events-auto",
              item.class,
              {
                "z-0 fixed w-screen h-screen inset-0": expand === item.id,
              }
            )}
            onClick={() => setExpand(item.id)}
          ></motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

export default Home;
