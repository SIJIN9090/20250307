import { Outlet, Route, Routes } from "react-router-dom";
import AdminHome from "../pages/admin/AdminHome";

import A_User from "../pages/admin/user/A_User";
import A_UserLayout from "../pages/admin/user/A_UserLayout";
import A_ReservationLayout from "../pages/admin/reservation/A_ReservationLayout";
import A_Reservation from "../pages/admin/reservation/A_Reservation";
// 공지사항
import NoticeLayout from "../pages/notice/NoticeLayout";
import Notice from "../pages/notice/Notice";
import NoticeWrite from "../pages/notice/NoticeWrite";
import NoticeDetail from "../pages/notice/NoticeDetail";
import NoticeUpdate from "../pages/notice/NoticeUpdate";

// 온라인 상담
import OnlineCounselLayout from "../pages/onlinecounsel/OnlineCounselLayout";
import OnlineCounsel from "../pages/onlinecounsel/OnlineCounsel";
import OnlineCounselWrite from "../pages/onlinecounsel/OnlineCounselWrite";
import OnlineCounselDetail from "../pages/onlinecounsel/OnlineCounselDetail";
import OnlineCounselUpdate from "../pages/onlinecounsel/OnlineCounselUpdate";

// 후기
import ReviewLayout from "../pages/reviews/ReviewLayout";
import Review from "../pages/reviews/Review";
import ReviewWrite from "../pages/reviews/ReviewWrite";
import ReviewDetail from "../pages/reviews/ReviewDetail";
import ReviewUpdate from "../pages/reviews/ReviewUpdate";

import AdminLayout from "../pages/admin/AdminHome";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />}>
        <Route path="adminuser" element={<A_UserLayout />}>
          <Route index element={<A_User />} />
        </Route>
        <Route path="a_reservation" element={<A_ReservationLayout />}>
          <Route index element={<A_Reservation />} />
        </Route>

        <Route path="notice" element={<NoticeLayout />}>
          <Route index element={<Notice />} />
          <Route path="write" element={<NoticeWrite />} />
          <Route path=":noticeId" element={<Outlet />}>
            <Route index element={<NoticeDetail />} />
            <Route path=":noticeId/update" element={<NoticeUpdate />} />
          </Route>
        </Route>

        <Route path="question" element={<OnlineCounselLayout />}>
          <Route index element={<OnlineCounsel />} />
          <Route path="write" element={<OnlineCounselWrite />} />
          <Route path=":questionId" element={<OnlineCounselDetail />} />
          <Route path=":questionId/update" element={<OnlineCounselUpdate />} />
        </Route>

        <Route path="review" element={<ReviewLayout />}>
          <Route index element={<Review />} />
          <Route path="write" element={<ReviewWrite />} />
          <Route path=":reviewId" element={<ReviewDetail />} />
          <Route path=":reviewId/update" element={<ReviewUpdate />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default AdminRouter;
