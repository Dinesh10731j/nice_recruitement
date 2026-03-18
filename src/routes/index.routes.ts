import { Router } from "express";
import authRouter from "./auth/auth.route";
import blogsRouter from "./blogs/blogs.route";
import certificateRouter from "./certificate/certificate.route";
import clientsRouter from "./clients/clients.route";
import contactRouter from "./contact/contact.route";
import galleryRouter from "./gallery/gallery.route";
import jobsRouter from "./jobs/jobs.route";
import servicesRouter from "./services/services.route";
import testimonialsRouter from "./testimonials/testimonials.route";
import newsLetterRouter from "./news-letter/news-letter.route";
import advertiseRouter from "./advertise/advertise.route";
import activityRouter from "./activity/activity.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/blogs", blogsRouter);
router.use("/certificate", certificateRouter);
router.use("/clients", clientsRouter);
router.use("/contact", contactRouter);
router.use("/gallery", galleryRouter);
router.use("/jobs", jobsRouter);
router.use("/services", servicesRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/news-letter", newsLetterRouter);
router.use("/advertise", advertiseRouter);
router.use("/activity", activityRouter);

export default router;
