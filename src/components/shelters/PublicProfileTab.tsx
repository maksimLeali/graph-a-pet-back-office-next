"use client";

import { ShelterPublicProfilePanel } from "@/components/shelters/ShelterPublicProfilePanel";

export const PublicProfileTab: React.FC<{ shelterId: string }> = ({
	shelterId,
}) => <ShelterPublicProfilePanel shelterId={shelterId} />;
