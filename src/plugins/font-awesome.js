import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';

library.add(faGoogle);
library.add(faGithub);
library.add(faBan)

export default FontAwesomeIcon;