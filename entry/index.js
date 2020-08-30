import version from './version';
import groups from './groups';
import install, { components } from './install';

const ATopic = {
    components,
    groups,
    install,
    version,
};

if (typeof window !== 'undefined') {
    window.ATopic = ATopic;
}

export default ATopic;
