import React from 'react';
import { Story, Meta } from '@storybook/react';

import { IProject } from 'interfaces/IProject';
import { ProjectContainer } from './ProjectContainer';

export default {
  title: 'PropertyInvest/ProjectContainer',
  component: ProjectContainer,
} as Meta;

const Template: Story<{projects: IProject[]}> = (args: {projects: IProject[]}) => 
    <ProjectContainer projects={args.projects}></ProjectContainer>;

const projects = [{"id":"608fc33ffc13ae180500000b","name":"Torp-Wolf","startDate":"28/10/2020","endDate":"26/11/2020","estimatedDurationInDays":691,"estimatedCost":41,"annualInterestRateOffered":74,"projectManager":"Audie Dwelling","description":"Plain Radiography of L Pulm Vein using H Osm Contrast"},
{"id":"608fc33ffc13ae180500000c","name":"Kovacek-Goyette","startDate":"6/12/2020","endDate":"26/3/2021","estimatedDurationInDays":809,"estimatedCost":42,"annualInterestRateOffered":63,"projectManager":"Amelia Branton","description":"Inspection of Brain, Percutaneous Approach"},
{"id":"608fc33ffc13ae180500000d","name":"Mayert LLC","startDate":"3/9/2020","endDate":"6/1/2021","estimatedDurationInDays":598,"estimatedCost":28,"annualInterestRateOffered":84,"projectManager":"Lemmie MacDearmont","description":"Excision of Optic Nerve, Percutaneous Approach"},
{"id":"608fc33ffc13ae180500000e","name":"Mohr, Larson and Ullrich","startDate":"7/6/2020","endDate":"20/4/2021","estimatedDurationInDays":874,"estimatedCost":73,"annualInterestRateOffered":76,"projectManager":"Nadya Althrop","description":"Destruction of R Shoulder Bursa/Lig, Open Approach"},
{"id":"608fc33ffc13ae180500000f","name":"Doyle, Morar and Kiehn","startDate":"18/12/2020","endDate":"5/10/2020","estimatedDurationInDays":806,"estimatedCost":82,"annualInterestRateOffered":52,"projectManager":"Ludwig Blaik","description":"Reposition Left Metacarpal, Percutaneous Endoscopic Approach"},
{"id":"608fc33ffc13ae1805000010","name":"Lueilwitz LLC","startDate":"9/12/2020","endDate":"30/1/2021","estimatedDurationInDays":809,"estimatedCost":84,"annualInterestRateOffered":60,"projectManager":"Cad Baudinelli","description":"Drainage of Left Brachial Artery, Perc Endo Approach"},
{"id":"608fc33ffc13ae1805000011","name":"Mohr, Rohan and Corkery","startDate":"26/9/2020","endDate":"16/7/2020","estimatedDurationInDays":997,"estimatedCost":71,"annualInterestRateOffered":94,"projectManager":"Paloma Seabon","description":"Alteration of R Ext Ear with Nonaut Sub, Perc Approach"},
{"id":"608fc33ffc13ae1805000012","name":"Cronin-Kuhn","startDate":"10/4/2021","endDate":"29/11/2020","estimatedDurationInDays":697,"estimatedCost":87,"annualInterestRateOffered":27,"projectManager":"Lorrie Worvell","description":"Restriction of Anus with Extralum Dev, Extern Approach"},
{"id":"608fc33ffc13ae1805000013","name":"Zulauf Inc","startDate":"17/1/2021","endDate":"27/3/2021","estimatedDurationInDays":640,"estimatedCost":50,"annualInterestRateOffered":17,"projectManager":"Ania Gall","description":"Drainage of Lum Disc with Drain Dev, Perc Approach"},
{"id":"608fc33ffc13ae1805000014","name":"Rice, Kozey and Lockman","startDate":"14/8/2020","endDate":"20/3/2021","estimatedDurationInDays":215,"estimatedCost":78,"annualInterestRateOffered":23,"projectManager":"Maddy Ruggieri","description":"Repair Right Carpal, External Approach"}];

 export const Standard = Template.bind({});
 Standard.args = {projects};
 
 export const Empty = Template.bind({});
 Empty.args = {projects:[]};

 export const NullData = Template.bind({});
 NullData.args = {projects:null};

 export const UndefinedData = Template.bind({});
 UndefinedData.args = {projects:undefined};
