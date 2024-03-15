export type Artists = {
	id: number;
	status?: string;
	sort?: number;
	created_by?: string;
	created_on?: string;
	modified_by?: string | DirectusUsers;
	modified_on?: string;
	level_of_involvement?: string;
	current_location?: string;
	soundcloud_url?: string;
	facebook_url?: string;
	other_links?: string;
	booking_contact?: string;
	type_of_art?: string;
	image?: string | DirectusFiles;
	artist_name?: string;
	hero_background_color?: string;
	slug?: string;
	events: string | EventsArtists[];
};

export type Content = {
	id: number;
	status?: string;
	created_by?: string;
	created_on?: string;
	on_page?: number | Pages;
	text?: string;
	image?: string | DirectusFiles;
	type?: string;
	image_two?: string | DirectusFiles;
	sort?: number;
	text_layout?: string;
	content_label?: string;
	distance_to_next?: string;
	captions?: unknown;
	content_for_project?: number | Projects;
	hero_background_color?: string;
};

export type Events = {
	id: number;
	status?: string;
	sort?: number;
	created_by?: string;
	created_on?: string;
	modified_by?: string | DirectusUsers;
	modified_on?: string;
	name: string;
	poster?: string | DirectusFiles;
	designer?: string;
	location?: string;
	startdatetime?: string;
	enddatetime?: string;
	project_lead?: string;
	accounting?: string;
	booking?: string;
	guests?: number;
	what_other_event_areas_are_you_trying_to_cover?: unknown;
	is_there_going_to_be_an_event_insurance?: unknown;
	who_of_you_takes_responsibility_of_your_design_wishes?: string;
	what_would_you_like_to_have_from_us?: unknown;
	deadline?: string;
	other_collectives_involved?: string;
	main_theme_of_event?: string;
	who_should_do_the_design?: unknown;
	proposed_artist?: string;
	size_of_the_event?: number;
	event_type?: string;
	if_there_is_music_involved_what_is_the_main_genre?: string;
	how_big_is_the_collaboration?: string;
	slug: string;
	hero_background_color?: string;
	estimated_guests?: string;
	Links?: unknown;
	rental_contract?: string | DirectusFiles;
	hubs: string | EventsHubs[];
	logo_of_other_collectives_involved: string | EventsDirectusFilesOtherCollectivesLogos[];
	upload_inspiration: string | EventsDirectusFilesInspiration[];
	design_assets: string | EventsDirectusFiles[];
	artists: string | EventsArtists[];
};

export type EventsArtists = {
	id: number;
	events_id?: number | Events;
	artists_id?: number | Artists;
};

export type EventsDirectusFiles = {
	id: number;
	directus_files_id?: string | DirectusFiles;
	events_id?: number | Events;
};

export type EventsDirectusFilesInspiration = {
	id: number;
	events_id: number | Events;
	directus_files_id: string | DirectusFiles;
};

export type EventsDirectusFilesOtherCollectivesLogos = {
	id: number;
	events_id: number | Events;
	directus_files_id: string | DirectusFiles;
};

export type EventsHubs = {
	id: number;
	events_id?: number | Events;
	hubs_id?: number | Hubs;
};

export type Hubs = {
	id: number;
	status?: string;
	created_by?: string;
	created_on?: string;
	modified_by?: string | DirectusUsers;
	modified_on?: string;
	city: string;
	country?: string;
	name_of_national_legal_institution?: string;
	facebook?: string;
	instagram?: string;
	active?: boolean;
	member: string | HubsMembers[];
};

export type HubsMembers = {
	id: number;
	hubs_id?: number | Hubs;
	members_id?: number | Members;
};

export type Lovecast = {
	id: number;
	status: string;
	sort?: number;
	owner?: string;
	created_on?: string;
	modified_by?: string | DirectusUsers;
	modified_on?: string;
	name_of_the_set?: string;
	soundcloud_link?: string;
	design?: string | DirectusFiles;
	type?: string;
	artist: string | LovecastArtists[];
};

export type LovecastArtists = {
	id: number;
	lovecast_id: number | Lovecast;
	artists_id: number | Artists;
};

export type Members = {
	id: number;
	status?: string;
	created_by?: string;
	created_on?: string;
	name?: string;
	slack_name?: string;
	hub?: number | Hubs;
	legal_member_of_national_institution?: boolean;
	position?: string;
	roles?: unknown;
	weekly_commitment?: number;
};

export type Pages = {
	id: number;
	status?: string;
	created_by?: string;
	created_on?: string;
	modified_by?: string | DirectusUsers;
	name?: string;
	slug?: string;
	hero_background_color?: string;
	content: Content[];
};

export type Projects = {
	id: number;
	status?: string;
	created_by?: string;
	created_on?: string;
	name?: string;
	location_country?: string;
	main_image?: string | DirectusFiles;
	pillar?: string;
	slug?: string;
	hero_background_color?: string;
	events_that_donated: string | ProjectsEvents[];
	content: string | Content[];
};

export type ProjectsEvents = {
	id: number;
	projects_id?: number | Projects;
	events_id?: number | Events;
};

export type DirectusActivity = {
	id: number;
	action: string;
	user?: string | DirectusUsers;
	timestamp: string;
	ip?: string;
	user_agent?: string;
	collection: string;
	item: string;
	comment?: string;
	origin?: string;
	revisions: string | DirectusRevisions[];
};

export type DirectusCollections = {
	collection: string;
	icon?: string;
	note?: string;
	display_template?: string;
	hidden: boolean;
	singleton: boolean;
	translations?: unknown;
	archive_field?: string;
	archive_app_filter: boolean;
	archive_value?: string;
	unarchive_value?: string;
	sort_field?: string;
	accountability?: string;
	color?: string;
	item_duplication_fields?: unknown;
	sort?: number;
	group?: string | DirectusCollections;
	collapse: string;
};

export type DirectusFields = {
	id: number;
	collection: string | DirectusCollections;
	field: string;
	special?: unknown;
	interface?: string;
	options?: unknown;
	display?: string;
	display_options?: unknown;
	readonly: boolean;
	hidden: boolean;
	sort?: number;
	width?: string;
	translations?: unknown;
	note?: string;
	conditions?: unknown;
	required?: boolean;
	group?: string | DirectusFields;
	validation?: unknown;
	validation_message?: string;
};

export type DirectusFiles = {
	id: string;
	storage: string;
	filename_disk?: string;
	filename_download: string;
	title?: string;
	type?: string;
	folder?: string | DirectusFolders;
	uploaded_by?: string | DirectusUsers;
	uploaded_on: string;
	modified_by?: string | DirectusUsers;
	modified_on: string;
	charset?: string;
	filesize?: number;
	width?: number;
	height?: number;
	duration?: number;
	embed?: string;
	description?: string;
	location?: string;
	tags?: unknown;
	metadata?: unknown;
};

export type DirectusFolders = {
	id: string;
	name: string;
	parent?: string | DirectusFolders;
};

export type DirectusMigrations = {
	version: string;
	name: string;
	timestamp?: string;
};

export type DirectusPermissions = {
	id: number;
	role?: string | DirectusRoles;
	collection: string;
	action: string;
	permissions?: unknown;
	validation?: unknown;
	presets?: unknown;
	fields?: unknown;
};

export type DirectusPresets = {
	id: number;
	bookmark?: string;
	user?: string | DirectusUsers;
	role?: string | DirectusRoles;
	collection?: string;
	search?: string;
	layout?: string;
	layout_query?: unknown;
	layout_options?: unknown;
	refresh_interval?: number;
	filter?: unknown;
	icon: string;
	color?: string;
};

export type DirectusRelations = {
	id: number;
	many_collection: string;
	many_field: string;
	one_collection?: string;
	one_field?: string;
	one_collection_field?: string;
	one_allowed_collections?: unknown;
	junction_field?: string;
	sort_field?: string;
	one_deselect_action: string;
};

export type DirectusRevisions = {
	id: number;
	activity: number | DirectusActivity;
	collection: string;
	item: string;
	data?: unknown;
	delta?: unknown;
	parent?: number | DirectusRevisions;
};

export type DirectusRoles = {
	id: string;
	name: string;
	icon: string;
	description?: string;
	ip_access?: unknown;
	enforce_tfa: boolean;
	admin_access: boolean;
	app_access: boolean;
	users: string | DirectusUsers[];
};

export type DirectusSessions = {
	token: string;
	user?: string | DirectusUsers;
	expires: string;
	ip?: string;
	user_agent?: string;
	share?: string | DirectusShares;
	origin?: string;
};

export type DirectusSettings = {
	id: number;
	project_name: string;
	project_url?: string;
	project_color?: string;
	project_logo?: string | DirectusFiles;
	public_foreground?: string | DirectusFiles;
	public_background?: string | DirectusFiles;
	public_note?: string;
	auth_login_attempts?: number;
	auth_password_policy?: string;
	storage_asset_transform?: string;
	storage_asset_presets?: unknown;
	custom_css?: string;
	storage_default_folder?: string | DirectusFolders;
	basemaps?: unknown;
	mapbox_key?: string;
	module_bar?: unknown;
	project_descriptor?: string;
	translation_strings?: unknown;
	default_language: string;
	custom_aspect_ratios?: unknown;
};

export type DirectusUsers = {
	id: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	password?: string;
	location?: string;
	title?: string;
	description?: string;
	tags?: unknown;
	avatar?: string | DirectusFiles;
	language?: string;
	theme?: string;
	tfa_secret?: string;
	status: string;
	role?: string | DirectusRoles;
	token?: string;
	last_access?: string;
	last_page?: string;
	provider: string;
	external_identifier?: string;
	auth_data?: unknown;
	email_notifications?: boolean;
};

export type DirectusWebhooks = {
	id: number;
	name: string;
	method: string;
	url: string;
	status: string;
	data: boolean;
	actions: unknown;
	collections: unknown;
	headers?: unknown;
};

export type DirectusDashboards = {
	id: string;
	name: string;
	icon: string;
	note?: string;
	date_created?: string;
	user_created?: string | DirectusUsers;
	color?: string;
	panels: string | DirectusPanels[];
};

export type DirectusPanels = {
	id: string;
	dashboard: string | DirectusDashboards;
	name?: string;
	icon?: string;
	color?: string;
	show_header: boolean;
	note?: string;
	type: string;
	position_x: number;
	position_y: number;
	width: number;
	height: number;
	options?: unknown;
	date_created?: string;
	user_created?: string | DirectusUsers;
};

export type DirectusNotifications = {
	id: number;
	timestamp?: string;
	status?: string;
	recipient: string | DirectusUsers;
	sender?: string | DirectusUsers;
	subject: string;
	message?: string;
	collection?: string;
	item?: string;
};

export type DirectusShares = {
	id: string;
	name?: string;
	collection?: string | DirectusCollections;
	item?: string;
	role?: string | DirectusRoles;
	password?: string;
	user_created?: string | DirectusUsers;
	date_created?: string;
	date_start?: string;
	date_end?: string;
	times_used?: number;
	max_uses?: number;
};

export type DirectusFlows = {
	id: string;
	name: string;
	icon?: string;
	color?: string;
	description?: string;
	status: string;
	trigger?: string;
	accountability?: string;
	options?: unknown;
	operation?: string | DirectusOperations;
	date_created?: string;
	user_created?: string | DirectusUsers;
	operations: string | DirectusOperations[];
};

export type DirectusOperations = {
	id: string;
	name?: string;
	key: string;
	type: string;
	position_x: number;
	position_y: number;
	options?: unknown;
	resolve?: string | DirectusOperations;
	reject?: string | DirectusOperations;
	flow: string | DirectusFlows;
	date_created?: string;
	user_created?: string | DirectusUsers;
};

export type CustomDirectusTypes = {
	artists: Artists;
	content: Content;
	events: Events;
	events_artists: EventsArtists;
	events_directus_files: EventsDirectusFiles;
	events_directus_files_inspiration: EventsDirectusFilesInspiration;
	events_directus_files_other_collectives_logos: EventsDirectusFilesOtherCollectivesLogos;
	events_hubs: EventsHubs;
	hubs: Hubs;
	hubs_members: HubsMembers;
	lovecast: Lovecast;
	lovecast_artists: LovecastArtists;
	members: Members;
	pages: Pages;
	projects: Projects;
	projects_events: ProjectsEvents;
	directus_activity: DirectusActivity;
	directus_collections: DirectusCollections;
	directus_fields: DirectusFields;
	directus_files: DirectusFiles;
	directus_folders: DirectusFolders;
	directus_migrations: DirectusMigrations;
	directus_permissions: DirectusPermissions;
	directus_presets: DirectusPresets;
	directus_relations: DirectusRelations;
	directus_revisions: DirectusRevisions;
	directus_roles: DirectusRoles;
	directus_sessions: DirectusSessions;
	directus_settings: DirectusSettings;
	directus_users: DirectusUsers;
	directus_webhooks: DirectusWebhooks;
	directus_dashboards: DirectusDashboards;
	directus_panels: DirectusPanels;
	directus_notifications: DirectusNotifications;
	directus_shares: DirectusShares;
	directus_flows: DirectusFlows;
	directus_operations: DirectusOperations;
};
