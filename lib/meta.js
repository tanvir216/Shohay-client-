import {
  FaTree,
  FaBroom,
  FaHandHoldingHeart,
  FaBowlFood,
  FaHeartPulse,
  FaBookOpen,
} from "react-icons/fa6";


export const TYPE_META = {
  Cleanup: { icon: FaBroom, blurb: "Streets, ponds and school yards." },
  Plantation: { icon: FaTree, blurb: "Saplings for greener neighbourhoods." },
  Donation: {
    icon: FaHandHoldingHeart,
    blurb: "Clothes, blankets and essentials.",
  },
  "Food Drive": { icon: FaBowlFood, blurb: "Hot meals and dry ration packs." },
  "Health Camp": { icon: FaHeartPulse, blurb: "Free check-ups and medicine." },
  Education: { icon: FaBookOpen, blurb: "Books, tutoring and reading drives." },
};

export function daysLeft(d) {
  const ms =
    new Date(d + "T00:00:00") -
    new Date(new Date().toISOString().slice(0, 10) + "T00:00:00");
  return Math.round(ms / 86400000);
}
export const leftLabel = (d) => {
  const n = daysLeft(d);
  return n <= 0
    ? "Today"
    : n === 1
      ? "Tomorrow"
      : n < 0
        ? "Ended"
        : `In ${n} days`;
};
