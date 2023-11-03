import React from 'react';
import { useContext } from 'react';
import * as ISO6391 from 'iso-639-1';
import { useTranslation } from 'react-i18next';
import { NavDropdown } from 'react-bootstrap';
import { ApplicationContext } from '../ApplicationContext';


const Language = () => {

    const { i18n } = useTranslation();
    const {configuration} = useContext(ApplicationContext);

    const changeLanguageHandler = (event, locale) => {
        event.preventDefault();
        // set current language
        configuration.currentLanguage = locale;
        // change language
        i18n.changeLanguage(locale);
    }

    return (<>
        <NavDropdown title={ISO6391.getNativeName(i18n.language)} id="language-dropdown">
            {
                configuration.settings.i18n.locales.map((locale) => (
                <NavDropdown.Item key={locale} onClick={(event) => changeLanguageHandler(event, locale)} href={"/language/set/" + locale}>
                    {ISO6391.getNativeName(locale)}
                </NavDropdown.Item>
                ))
            }
        </NavDropdown>
    </>)

}

export {
    Language
}