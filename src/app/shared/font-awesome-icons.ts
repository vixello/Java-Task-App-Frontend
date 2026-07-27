/**
 * <summary>
 * Central registry of FontAwesome icons used across the application.
 * Add icons here to make them available globally through FaIconLibrary.
 * </summary>
 */

import { IconDefinition } from '@fortawesome/angular-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faExclamationTriangle, faExclamationCircle, faBell, faCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';

export const fontAwesomeIcons = [
    faUser,
    faExclamationTriangle,
    faExclamationCircle,
    faBell,
    faCircle,
    faCheck,
    farCircle
];