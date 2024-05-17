export interface TeamMember {
    id?: number;
    firstName: string;
    lastName: string;
    teamName: string;
    specialization: string;
    biography: string;
    createdAt: string;
    updatedAt: string;
    image: {
        id: number;
        publicId: string;
        url: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface SaveTeamMemberForm {
    biography: string;
    firstName: string;
    lastName: string;
    specialization: string;
    teamName: string;
}

export interface CreateTeamMemberResponse {
    message: string;
    teamMember: TeamMember;
}

export interface UpdateTeamMemberResponse extends CreateTeamMemberResponse {

}

export interface ImageI {
    src: string;
    file: any;
    publicId: any;
}

export const useTeamMember = () => {
    const { call } = useCall();
    const teamMembers = ref<TeamMember[] | null>()
    const teamMember = ref<TeamMember | null>()

    const getTeamMembers = async ({ isClient = false, isAuth = false }: { isClient?: boolean, isAuth?: boolean } = {}) => {
        const { data } = await call<TeamMember[]>({
            endpoint: `/team-members`,
            isAuth: isClient,
            isClient: isAuth,
        });
        teamMembers.value = data;
    };

    const getTeamMember = async ({ userId, isClient = false, isAuth = false }: { userId: number, isClient?: boolean, isAuth?: boolean, }) => {
        const { data } = await call<TeamMember>({
            endpoint: `/team-members/${userId}`,
            isAuth: isClient,
            isClient: isAuth,
        });
        teamMember.value = data;
    };

    const createTeamMember = async (teamMemberForm: SaveTeamMemberForm, image: ImageI) => {
        const formData = new FormData();

        formData.append(`images`, image.file);
        for (const [key, teamMemberFormElement] of Object.entries(teamMemberForm)) {
            formData.append(key, teamMemberFormElement)
        }
        const { data } = await call<CreateTeamMemberResponse>({ endpoint: '/team-members', method: 'POST', isClient: true, isAuth: true, body: formData })
        teamMember.value = data?.teamMember
        return data?.message
    }

    const saveTeamMember = async (teamMemberId: string, teamMemberForm: SaveTeamMemberForm, image: ImageI) => {
        console.log('saveTeamMember')
        const formData = new FormData();

        console.log(`image.publicId -> ${image.publicId}`)
        if (!image.publicId) {
            formData.append(`images`, image.file);
        }

        for (const [key, teamMemberFormElement] of Object.entries(teamMemberForm)) {
            formData.append(key, teamMemberFormElement)
        }
        const { data } = await call<CreateTeamMemberResponse>({ endpoint: `/team-members/${teamMemberId}`, method: 'PATCH', isClient: true, isAuth: true, body: formData })
        teamMember.value = data?.teamMember
        return data?.message
    }

    const deleteTeamMember = async ({ teamMemberId, isClient = false, isAuth = false }: { teamMemberId: number, isClient?: boolean, isAuth?: boolean }) => {
        const { data } = await call<{ message: string }>({
            method: 'DELETE',
            endpoint: `/team-members/${teamMemberId}`,
            isAuth: isClient,
            isClient: isAuth,
            body: undefined
        });
        return data?.message
    };

    return { teamMember, teamMembers, getTeamMember, getTeamMembers, saveTeamMember, createTeamMember, deleteTeamMember, }
}