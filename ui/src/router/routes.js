import {Home} from "../page/home";
import {Project, ProjectModify} from "../page/content/project";
import {Gallery, GalleryModify} from "../page/content/gallery";
import {Room, RoomModify} from "../page/content/room";
import {Comment} from "../page/comment";
import {Favorite, UserFavoriteProject} from "../page/marketing";

export default () => {
    return [
        {
            key: "/",
            component: Home,
            iconType: "home",
            name: 'Home',
            description: 'Home Page',
            exact: true
        },
        {
            iconType: "database",
            name: 'Content',
            key: '/content',
            component: null,
            exact: true,
            children: [
                {
                    key: "/content/project/modify/:id?",
                    name: "Project Modify",
                    component: ProjectModify,
                    exact: false,
                    hidden: true
                },
                {
                    key: "/content/project",
                    name: "Project",
                    component: Project,
                    exact: true,
                },
                {
                    key: "/content/project/:projectId/gallery/modify/:id?",
                    name: "Project Modify",
                    component: GalleryModify,
                    exact: false,
                    hidden: true
                },
                {
                    key: "/content/project/:id?/gallery",
                    name: "Project",
                    component: Gallery,
                    exact: true,
                    hidden: true
                },
                {
                    key: "/content/project/:projectId/room/modify/:id?",
                    name: "Room Modify",
                    component: RoomModify,
                    exact: false,
                    hidden: true
                },
                {
                    key: "/content/project/:id?/room",
                    name: "Room",
                    component: Room,
                    exact: true,
                    hidden: true
                },
            ]
        },
        {
            key: "/comment",
            name: "Comment",
            iconType: "message",
            component: Comment,
            exact: true,
        },
        {
            key: "/marketing",
            name: "Marketing",
            iconType: "notification",
            exact: true,
            children: [
                {
                    key: "/marketing/favorite",
                    name: "Favorite",
                    component: Favorite,
                    exact: true,
                },
                {
                    key: "/marketing/favorite/project/:id",
                    name: "User Favorite Project",
                    component: UserFavoriteProject,
                    exact: true,
                    hidden: true
                },
            ]
        },
    ]
}
