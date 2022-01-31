export type Artists = {
	id: number;
	status?: string;
	sort?: number;
	created_by?: string;
	created_on?: string;
	modified_by?: string;
	modified_on?: string;
	level_of_involvement?: string;
	current_location?: string;
	soundcloud_url?: string;
	facebook_url?: string;
	other_links?: string;
	booking_contact?: string;
	type_of_art?: string;
	image?: DirectusFiles;
	artist_name?: string;
	hero_background_color?: string;
	slug?: string;
	events: {
		id: number;
		events_id?: PartialItem<Events>;
		artists_id?: PartialItem<Artists>;
	}[];
};

export type ContentCollection = {
	id: number;
	status?: string;
	created_by?: string;
	created_on?: string;
	on_page?: number;
	text?: string;
	image?: DirectusFiles;
	type?: string;
	image_two?: DirectusFiles;
	sort?: number;
	text_layout?: string;
	content_label?: string;
	distance_to_next?: string;
	captions?: { imageOneCaption?: string; imageTwoCaption?: string };
	content_for_project?: number;
	hero_background_color?: string;
};

export type Events = {
	id: number;
	status?: string;
	sort?: number;
	created_by?: string;
	created_on?: string;
	modified_by?: string;
	modified_on?: string;
	name?: string;
	poster?: DirectusFiles;
	designer?: string;
	location?: string;
	startdatetime?: string;
	enddatetime?: string;
	project_lead?: string;
	accounting?: string;
	booking?: string;
	guests?: number;
	on_website?: boolean;
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
	slug?: string;
	hero_background_color?: string;
	estimated_guests?: string;
	human_power: string;
	logo_of_other_collectives_involved: string;
	upload_inspiration: string;
	hubs: {
		id: number;
		events_id?: number;
		hubs_id?: PartialItem<Hubs>;
	}[];
	artists: {
		id: number;
		events_id?: number;
		artists_id?: PartialItem<Artists>;
	}[];
	design_info: string;
	design_assets: string;
	event_info: string;
};

export type EventsArtists = {
	id: number;
	events_id?: number;
	artists_id?: number;
};

export type EventsDirectusFiles = {
	id: number;
	directus_files_id?: string;
	events_id?: number;
};

export type EventsDirectusFilesInspiration = {
	id: number;
	events_id: number;
	directus_files_id: string;
};

export type EventsDirectusFilesOtherCollectivesLogos = {
	id: number;
	events_id: number;
	directus_files_id: string;
};

export type EventsHubs = {
	id: number;
	events_id?: number;
	hubs_id?: number;
};

export type Hubs = {
	id: number;
	status?: string;
	created_by?: string;
	created_on?: string;
	modified_by?: string;
	modified_on?: string;
	city?: string;
	country?: string;
	name_of_national_legal_institution?: string;
	facebook?: string;
	instagram?: string;
	active?: boolean;
	member: string;
};

export type HubsMembers = {
	id: number;
	hubs_id?: number;
	members_id?: number;
};

export type Lovecast = {
	id: number;
	status: string;
	sort?: number;
	owner?: string;
	created_on?: string;
	modified_by?: string;
	modified_on?: string;
	name_of_the_set?: string;
	soundcloud_link?: string;
	design?: string;
	published?: boolean;
	slug?: string;
	artist: string;
};

export type LovecastArtists = {
	id: number;
	lovecast_id: number;
	artists_id: number;
};

export type Members = {
	id: number;
	status?: string;
	created_by?: string;
	created_on?: string;
	name?: string;
	slack_name?: string;
	hub?: number;
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
	modified_by?: string;
	name?: string;
	slug?: string;
	hero_background_color?: string;
	content: ContentCollection[];
};

export type Projects = {
	id: number;
	status?: string;
	created_by?: string;
	created_on?: string;
	name?: string;
	location_country?: string;
	location_city?: string;
	partner_organisations?: string;
	link_main_partner_organisation?: string;
	contact_main_partner_organisation?: string;
	short_description?: string;
	project_info?: string;
	main_image?: DirectusFiles;
	pillar?: string;
	slug?: string;
	hero_background_color?: string;
	content: ContentCollection[];
	events_that_donated: string;
};

export type ProjectsEvents = {
	id: number;
	projects_id?: number;
	events_id?: number;
};

export type DirectusActivity = {
	id: number;
	action: string;
	user?: string;
	timestamp: string;
	ip: string;
	user_agent?: string;
	collection: string;
	item: string;
	comment?: string;
	revisions: string;
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
	group?: string;
	collapse: string;
	collection_divider: string;
	archive_divider: string;
	sort_divider: string;
	accountability_divider: string;
	duplication_divider: string;
};

export type DirectusFields = {
	id: number;
	collection: string;
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
	group?: string;
};

export type DirectusFiles = {
	id: string;
	storage: string;
	filename_disk?: string;
	filename_download: string;
	title?: string;
	type?: string;
	folder?: string;
	uploaded_by?: string;
	uploaded_on: string;
	modified_by?: string;
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
	storage_divider: string;
};

export type DirectusFolders = {
	id: string;
	name: string;
	parent?: string;
};

export type DirectusMigrations = {
	version: string;
	name: string;
	timestamp?: string;
};

export type DirectusPermissions = {
	id: number;
	role?: string;
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
	user?: string;
	role?: string;
	collection?: string;
	search?: string;
	layout?: string;
	layout_query?: unknown;
	layout_options?: unknown;
	refresh_interval?: number;
	filter?: unknown;
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
	activity: number;
	collection: string;
	item: string;
	data?: unknown;
	delta?: unknown;
	parent?: number;
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
	users: string;
};

export type DirectusSessions = {
	token: string;
	user?: string;
	expires: string;
	ip?: string;
	user_agent?: string;
	share?: string;
};

export type DirectusSettings = {
	id: number;
	project_name: string;
	project_url?: string;
	project_color?: string;
	project_logo?: string;
	public_foreground?: string;
	public_background?: string;
	public_note?: string;
	auth_login_attempts?: number;
	auth_password_policy?: string;
	storage_asset_transform?: string;
	storage_asset_presets?: unknown;
	custom_css?: string;
	storage_default_folder?: string;
	basemaps?: unknown;
	mapbox_key?: string;
	module_bar?: unknown;
	project_descriptor?: string;
	branding_divider: string;
	modules_divider: string;
	security_divider: string;
	files_divider: string;
	map_divider: string;
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
	avatar?: string;
	language?: string;
	theme?: string;
	tfa_secret?: string;
	status: string;
	role?: string;
	token?: string;
	last_access?: string;
	last_page?: string;
	provider: string;
	external_identifier?: string;
	auth_data?: unknown;
	email_notifications?: boolean;
	preferences_divider: string;
	admin_divider: string;
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
	triggers_divider: string;
};

export type DirectusDashboards = {
	id: string;
	name: string;
	icon: string;
	note?: string;
	date_created?: string;
	user_created?: string;
	panels: string;
};

export type DirectusPanels = {
	id: string;
	dashboard: string;
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
	user_created?: string;
};

export type DirectusNotifications = {
	id: number;
	timestamp: string;
	status?: string;
	recipient: string;
	sender: string;
	subject: string;
	message?: string;
	collection?: string;
	item?: string;
};

export type DirectusShares = {
	id: string;
	name?: string;
	collection?: string;
	item?: string;
	role?: string;
	password?: string;
	user_created?: string;
	date_created?: string;
	date_start?: string;
	date_end?: string;
	times_used?: number;
	max_uses?: number;
};

export type CustomDirectusTypes = {
	artists: Artists;
	content: ContentCollection;
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
};
