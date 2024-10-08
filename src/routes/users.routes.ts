import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import CreateUserService from "../service/CreateUserService";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UpdateUserAvatarService from "../service/UpdateUserAvatarService";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
    try {
        const { name, email, password } = request.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password; // It's not necessary to show the password

        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    "/avatar",
    ensureAuthenticated,
    upload.single("avatar"),
    async (request, response) => {
        console.log(request.file);

        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file?.filename,
        });

        delete user.password; // It's not necessary to show the password

        return response.json(user);
    },
);

export default usersRouter;
