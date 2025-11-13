export type Detection = {
id: string;
user_id: string | null;
image_url: string;
label: string;
confidence: number;
created_at: string;
};


export type Profile = {
id: string;
display_name: string | null;
avatar_url: string | null;
updated_at: string | null;
};