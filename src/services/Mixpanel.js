import mixpanel from 'mixpanel-browser';
mixpanel.init('f77e7a77b9bdc79260ca18f409b1a254');

const env_check = process.env.NODE_ENV === 'production';

export const log = message => {
	actions.track(message, {});
};

let actions = {
	identify: id => {
		if (env_check) mixpanel.identify(id);
	},
	alias: id => {
		if (env_check) mixpanel.alias(id);
	},
	track: (name, props) => {
		if (env_check) mixpanel.track(name, props);
	},
	people: {
		set: props => {
			if (env_check) mixpanel.people.set(props);
		},
	},
};

export const Mixpanel = actions;
