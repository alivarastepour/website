import { useGetUserMeMutation } from "@/services/auth";
import { useGetUserVotesMutation } from "@/services/user";
import { useAppSelector } from "@/utils/hooks";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Fragment, PropsWithChildren, useEffect } from "react";
import CreateTopicModal from "../CreateTopicModal";
import Actions from "./Actions";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function RootLayout({ children }: PropsWithChildren) {
  const { isLoggedIn, checkSessionloading, user } = useAppSelector(
    (state) => state.auth
  );
  const [getUserMe, { isLoading, status, data }] = useGetUserMeMutation();
  const [getUserVotes] = useGetUserVotesMutation();

  useEffect(() => {
    getUserMe("");
  }, []);

  useEffect(() => {
    if (status === "fulfilled" && user) {
      getUserVotes({ id: user.id });
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-background text-secondary font-poppins h-full">
      <Fragment>
        {isLoggedIn && <CreateTopicModal />}
        {children}
        {isLoggedIn && <Actions />}
      </Fragment>
    </div>
  );
}
