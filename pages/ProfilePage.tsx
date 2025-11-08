import React, { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth';
import { getManagedTeam, getUserProfileData, getCompanyInfo, updateUserProfile, updateCompanyInfo } from '../services/api';
import { Employee, Shift, Company, JobRole } from '../lib/mockData';
import UserProfileCard from '../components/UserProfileCard';
import UpcomingShiftsList from '../components/UpcomingShiftsList';
import TeamView from '../components/TeamView';
import CompanySettings from '../components/CompanySettings';
import EditProfileModal from '../components/EditProfileModal';

const ProfilePage: React.FC = () => {
    const [viewer, setViewer] = useState<Employee | null>(null);
    const [profileData, setProfileData] = useState<{ user: Employee, shifts: Shift[] } | null>(null);
    const [allJobRoles, setAllJobRoles] = useState<JobRole[]>([]);
    const [team, setTeam] = useState<Employee[]>([]);
    const [company, setCompany] = useState<Company | null>(null);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

    const loadProfileData = useCallback(async () => {
        try {
            setError(null);
            setIsLoading(true);
            const currentViewer = await authService.getCurrentUser();
            if (!currentViewer) {
                throw new Error("You are not logged in.");
            }
            setViewer(currentViewer);

            const [userProfile, managedTeam, companyInfo] = await Promise.all([
                getUserProfileData(currentViewer.id),
                (currentViewer.permissionRole === 'Manager' || currentViewer.permissionRole === 'Owner') ? getManagedTeam() : Promise.resolve([]),
                (currentViewer.permissionRole === 'Owner') ? getCompanyInfo(currentViewer.companyId) : Promise.resolve(null),
            ]);
            
            setProfileData({ user: userProfile.user, shifts: userProfile.shifts });
            setAllJobRoles(userProfile.allJobRoles);
            setTeam(managedTeam);
            setCompany(companyInfo);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProfileData();
    }, [loadProfileData]);

    const handleProfileUpdate = async (updates: Partial<Pick<Employee, 'name' | 'location' | 'jobRoleIds'>>) => {
        if (!viewer) return;
        try {
            await updateUserProfile(viewer.id, updates);
            setIsEditProfileModalOpen(false);
            await loadProfileData(); // Refresh all data
        } catch (error) {
            alert('Failed to update profile. Please try again.');
            console.error(error);
        }
    };
    
    const handleCompanyUpdate = async (updates: Partial<Pick<Company, 'name'>>) => {
        if (!company) return;
         try {
            await updateCompanyInfo(company.id, updates);
            await loadProfileData(); // Refresh all data
            return true;
        } catch (error) {
            alert('Failed to update company details. Please try again.');
            console.error(error);
            return false;
        }
    }

    if (isLoading) {
        return <div className="text-center text-slate-400">Loading profile...</div>;
    }

    if (error) {
        return <div className="text-center text-red-400">Error: {error}</div>;
    }

    if (!viewer || !profileData) {
        return <div className="text-center text-slate-400">Could not load profile data.</div>;
    }

    return (
        <>
            <div className="space-y-8">
                <UserProfileCard 
                    user={profileData.user} 
                    jobRoles={allJobRoles}
                    onEditClick={() => setIsEditProfileModalOpen(true)} 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {team.length > 0 && <TeamView team={team} jobRoles={allJobRoles} />}
                        {viewer.permissionRole === 'Owner' && company && (
                            <CompanySettings 
                                company={company}
                                onCompanyUpdate={handleCompanyUpdate}
                            />
                        )}
                    </div>
                    <div className="md:col-span-1">
                         <UpcomingShiftsList shifts={profileData.shifts} />
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditProfileModalOpen}
                onClose={() => setIsEditProfileModalOpen(false)}
                user={profileData.user}
                allJobRoles={allJobRoles}
                onSave={handleProfileUpdate}
            />
        </>
    );
};

export default ProfilePage;