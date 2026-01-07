import { useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { getRecentlyViewedProducts } from "@/utils/recentlyViewed";
import { getTopTags } from "@/utils/topTags";
import { useCartStore } from "@/store/useCartStore";
import Container from "@/components/ui/Container";
import UserInformation from "./components/userInformation";
import RecentlyViewedItems from "./components/RecentlyViewedItems";
import CartPreview from "./components/CartPreview";
import { motion } from "motion/react";
import {
  staggeredContainerVariants,
  staggeredItemVariants
} from "@/animations/transitions/staggered";
import "@/styles/ProductCard.styles.css";

const ProfilePage = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const firstName = useMemo(() => user?.given_name, [user]);
  const lastName = useMemo(() => user?.family_name, [user]);
  const fullName = useMemo(() => `${firstName} ${lastName}`, [
    firstName,
    lastName
  ]);
  const email = useMemo(() => user?.email, [user]);
  const picture = useMemo(() => user?.picture, [user]);
  const emailVerified = useMemo(() => user?.email_verified, [user]);
  const recentlyViewedProducts = useMemo(() => getRecentlyViewedProducts(), []);
  const topTags = useMemo(() => getTopTags(), []);
  const cartItems = useCartStore(state => state.items);

  const handleLogout = () => {
    navigate("/signing-out");
  };

  return (
    <Container utilityClasses="py-5 px-3 px-md-4">
      <motion.div
        variants={staggeredContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {user && (
          <motion.div variants={staggeredItemVariants}>
            <UserInformation
              firstName={firstName}
              email={email}
              picture={picture}
              emailVerified={emailVerified}
              fullName={fullName}
              topTags={topTags}
              handleLogout={handleLogout}
            />
          </motion.div>
        )}

        {cartItems?.length > 0 && (
          <motion.div variants={staggeredItemVariants}>
            <CartPreview cartItems={cartItems} />
          </motion.div>
        )}

        {recentlyViewedProducts?.length > 0 && (
          <motion.div variants={staggeredItemVariants}>
            <RecentlyViewedItems
              recentlyViewedProducts={recentlyViewedProducts}
            />
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default ProfilePage;