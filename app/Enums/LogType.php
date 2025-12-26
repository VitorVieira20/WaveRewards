<?php

namespace App\Enums;

enum LogType: string
{
    case GENERAL = 'general';
    case AUTH = 'auth';
    case ACTIVITIES = 'activities';
    case CHATBOT = 'chatbot';
    case COMMUNITY = 'community';
    case CONTACTS = 'contacts';
    case SETTINGS = 'settings';
    case WORKSHOPS = 'workshops';
    case ACHIEVEMENTS = 'achievements';
    case TEAMS = 'teams';
}