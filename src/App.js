import React, { useState, useEffect, useRef } from 'react';
import { storage } from './supabaseConfig';

// ============================================================================
// PHASE 4: SUPABASE VERSION
// Now using Supabase for cloud storage and cross-device sync
// All data is stored in Supabase tables
// ============================================================================

// Set window.storage to use Supabase adapter
if (typeof window !== 'undefined') {
  window.storage = storage;
}

// Lucide React icons - SVG components
const Plus = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const Check = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const X = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const Edit2 = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>;
const Trash2 = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const FolderPlus = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>;
const RefreshCw = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>;
const Search = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const Mail = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const Phone = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MapPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const Upload = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const ChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const ChevronUp = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>;

// ============================================================================
// STORAGE CONFIGURATION - PHASE 4: SUPABASE CLOUD STORAGE
// ============================================================================
// Current mode: Supabase (PostgreSQL cloud database)
// - Works online
// - Persists across all devices
// - Cross-device sync enabled
// - Real cloud storage
// 
// All data is stored in Supabase tables via supabaseConfig.js
// ============================================================================

const STORAGE_CONFIG = {
  version: '1.0.0-phase4-supabase'
};

// Note: Using window.storage which now points to Supabase
// See supabaseConfig.js for the storage adapter implementation
// ============================================================================

export default function CREProjectManager() {
  // ============================================================================
  // HELPER FUNCTIONS - Date Formatting
  // ============================================================================
  // Fix timezone issue: Input date strings (YYYY-MM-DD) should display as-is
  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    // If it's already in YYYY-MM-DD format, parse it locally to avoid timezone shift
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      return new Date(year, month - 1, day).toLocaleDateString();
    }
    // Otherwise use standard date parsing
    return new Date(dateString).toLocaleDateString();
  };

  // Helper function to create Date objects from YYYY-MM-DD strings without timezone issues
  const parseLocalDate = (dateString) => {
    if (!dateString) return null;
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date(dateString);
  };

  const [masterTasks, setMasterTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [view, setView] = useState('home'); // 'home', 'projects', 'master', 'project-detail'
  const [projectTab, setProjectTab] = useState('active'); // 'active', 'completed'
  const [projectView, setProjectView] = useState('active'); // 'active', 'archived'
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState('all');
  const [filterSubdivision, setFilterSubdivision] = useState('all');
  const [showBackupRestore, setShowBackupRestore] = useState(false); // For collapsible backup/restore card
  
  const [newTaskForm, setNewTaskForm] = useState({ task: '', team: '', subdivision: '', notes: '' });
  const [newProjectForm, setNewProjectForm] = useState({ 
    name: '', 
    projectType: 'Standard',
    address: '',
    sqft: '',
    approvedBudget: '',
    leaseExpiration: '',
    logo: '' // Base64 encoded logo image
  });
  const [editingTask, setEditingTask] = useState(null);
  const [customTeams, setCustomTeams] = useState([]);
  const [customSubdivisions, setCustomSubdivisions] = useState([]);
  const [customProjectTypes, setCustomProjectTypes] = useState([]);
  const [showNewProjectTypeInput, setShowNewProjectTypeInput] = useState(false);
  const [newProjectTypeName, setNewProjectTypeName] = useState('');
  const [showNewTeamInput, setShowNewTeamInput] = useState(false);
  const [showNewSubdivisionInput, setShowNewSubdivisionInput] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newSubdivisionName, setNewSubdivisionName] = useState('');
  const [newScheduleItem, setNewScheduleItem] = useState({ name: '', startDate: '', endDate: '' });
  const [editingScheduleItem, setEditingScheduleItem] = useState(null);
  const [editingProjectDetails, setEditingProjectDetails] = useState(false);
  const [editedProject, setEditedProject] = useState(null);
  const [newBudgetItem, setNewBudgetItem] = useState({ category: '', baselineCost: '', targetCost: '' });
  const [newCostSaving, setNewCostSaving] = useState({ description: '', amount: '', notes: '' });
  const [editingCostSaving, setEditingCostSaving] = useState(null);
  const [editingBudgetItem, setEditingBudgetItem] = useState(null);
  const [newSubTask, setNewSubTask] = useState({});
  const [expandedMasterTasks, setExpandedMasterTasks] = useState({});
  const [newSubmittal, setNewSubmittal] = useState({ type: '', description: '', notes: '' });
  const [editingSubmittal, setEditingSubmittal] = useState(null);
  const [newRFI, setNewRFI] = useState({ description: '', responsibleTeam: '', notes: '' });
  const [editingRFI, setEditingRFI] = useState(null);
  const [newChangeOrder, setNewChangeOrder] = useState({ description: '', amount: '', notes: '', requestedBy: '' });
  const [editingChangeOrder, setEditingChangeOrder] = useState(null);
  const [newPermitComment, setNewPermitComment] = useState({ description: '', commentType: '', notes: '' });
  const [newMeetingNote, setNewMeetingNote] = useState({ title: '', notes: '' });
  const [newFloorPlan, setNewFloorPlan] = useState({ title: '', file: null, fileUrl: '' });
  const [expandedFloorPlan, setExpandedFloorPlan] = useState(null);
  const [expandedCostSavings, setExpandedCostSavings] = useState({});
  const [expandedSubmittals, setExpandedSubmittals] = useState({});
  const [expandedRFIs, setExpandedRFIs] = useState({});
  const [expandedChangeOrders, setExpandedChangeOrders] = useState({});
  const [expandedPermitComments, setExpandedPermitComments] = useState({});
  const [editingMeetingNote, setEditingMeetingNote] = useState(null);
  const [editingPermitComment, setEditingPermitComment] = useState(null);
  const [newBidItem, setNewBidItem] = useState({ phase: '', date: '', notes: '' });
  const [editingBidItem, setEditingBidItem] = useState(null);
  const [expandedProjectTasks, setExpandedProjectTasks] = useState({});
  const [showProjectInfo, setShowProjectInfo] = useState(false); // Collapsed by default to save space
  const [expandedScheduleItems, setExpandedScheduleItems] = useState({});
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // { type: 'task', id: '...', projectId: '...' }
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [importingCSV, setImportingCSV] = useState(false);
  
  // Map States
  const mapRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [geocodingProject, setGeocodingProject] = useState(null);
  const [selectedMapProject, setSelectedMapProject] = useState(null);
  
  // Team Directory States
  const [contacts, setContacts] = useState([]);
  const [expandedContacts, setExpandedContacts] = useState({});
  const [expandedTeamMembers, setExpandedTeamMembers] = useState({});
  const [newContact, setNewContact] = useState({ 
    name: '', 
    role: '', 
    company: '', 
    email: '', 
    phone: '', 
    trades: [], 
    notes: '' 
  });
  const [editingContact, setEditingContact] = useState(null);
  const [contactSearchTerm, setContactSearchTerm] = useState('');
  const [contactFilterTrade, setContactFilterTrade] = useState('all');
  const [teamTab, setTeamTab] = useState('contacts'); // 'contacts' or 'performance'
  const [performanceReviews, setPerformanceReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    contactId: '',
    projectId: '',
    date: new Date().toISOString().split('T')[0],
    metrics: {
      quality: 0,
      timeliness: 0,
      communication: 0,
      budgetAdherence: 0,
      safety: 0
    },
    notes: '',
    wouldHireAgain: true
  });
  const [editingReview, setEditingReview] = useState(null);
  const [selectedPerformanceContact, setSelectedPerformanceContact] = useState(null);

  // Consistent milestone ordering - used across all views
  const MILESTONE_ORDER = ['Funding Approval', 'Design Start', 'Construction Start', 'Substantial Completion', 'Handover', 'Go Live'];

  const saveTimerRef = useRef(null);
  const pendingSaveRef = useRef(null);
  
  const sortScheduleItems = (items) => {
    return [...items].sort((a, b) => {
      const isKeyA = MILESTONE_ORDER.includes(a.name);
      const isKeyB = MILESTONE_ORDER.includes(b.name);
      
      // Both are key milestones - use defined order
      if (isKeyA && isKeyB) {
        return MILESTONE_ORDER.indexOf(a.name) - MILESTONE_ORDER.indexOf(b.name);
      }
      
      // One is key milestone, one is custom - key milestones come first
      if (isKeyA) return -1;
      if (isKeyB) return 1;
      
      // Both are custom items - sort by date
      const dateA = a.startDate ? new Date(a.startDate) : new Date(8640000000000000); // Far future if no date
      const dateB = b.startDate ? new Date(b.startDate) : new Date(8640000000000000);
      return dateA - dateB;
    });
  };

  const teams = [
    'Owner',
    'Architect',
    'Contractor',
    'Engineer',
    'AV',
    'Low Voltage',
    'Structural Cabling',
    'Furniture',
    'Facilities Management',
    'Amenities Services',
    'Chief Engineer Equipment',
    'GTI',
    'GRE Design & Construction',
    'Landlord',
    'Security',
    'MEP',
    'FM Engineering',
    'Expeditor',
    'Commissioning',
    'LOB',
    'Standard Playbook',
    'Clients Center Playbook',
    'REPER Playbook'
  ];

  const normalizeName = (value) => {
    if (typeof value !== 'string') return '';
    return value.trim().replace(/\s+/g, ' ');
  };

  const dedupeNames = (items = []) => {
    if (!Array.isArray(items)) return [];
    const seen = new Set();
    return items.reduce((acc, item) => {
      const normalized = normalizeName(item);
      if (!normalized) return acc;
      const key = normalized.toLowerCase();
      if (seen.has(key)) return acc;
      seen.add(key);
      acc.push(normalized);
      return acc;
    }, []);
  };

  const builtInTeamKeys = new Set(teams.map(team => team.toLowerCase()));
  const sanitizeCustomTeams = (items = []) =>
    dedupeNames(items).filter(team => !builtInTeamKeys.has(team.toLowerCase()));

  const subdivisions = [
    'Design',
    'Design Start',
    'Schematic Design',
    'Design Development',
    'Construction Documents',
    'LOB Review Package',
    'Permitting',
    'Bidding',
    'Construction',
    'Closeout',
    'Owner',
    'Onboarding',
    'Technology Setup',
    'Initiate',
    'Planning',
    'Execution & Construction',
    'Handover',
    'Lesson Learned',
    'Pre-Construction',
    'Procurement',
    'Construction Administration',
    'FFE&E',
    'Move',
    'Commissioning & Testing',
    'Schedule',
    'MER Checklist',
    'Project Manager',
    'Proposal',
    'Coordination',
    'LOB',
    'FM Team',
    'Global Design',
    'PO',
    'Cerp'
  ];

  const projectTypes = [
    'Standard',
    'Enhanced Project',
    'REPER',
    'Client Center',
    'Low Renovation',
    'Medium Renovation',
    'High Renovation',
    'Technology Upgrade',
    'Infrastructure Upgrades',
    'Exterior Upgrades',
    'Roof Upgrades',
    'Retail Project'
  ];

  const allTeams = dedupeNames([...teams, ...customTeams]);
  const allSubdivisions = [...subdivisions, ...customSubdivisions];
  const allProjectTypes = [...projectTypes, ...customProjectTypes];

  const defaultBudgetCategories = [
    'Hard Cost',
    'Soft Cost',
    'FF&E',
    'Expenses',
    'Contingency',
    'GTI',
    'Tax'
  ];

  const submittalTypes = [
    'Shop Drawings',
    'Product Data',
    'Samples',
    'Mix Designs',
    'Test Reports',
    'Certificates',
    'Manufacturer Instructions',
    'Warranties',
    'As-Built Drawings',
    'O&M Manuals',
    'Color Selections',
    'Material Specifications'
  ];

  // Format budget as currency
  const formatBudget = (value) => {
    if (!value) return '';
    // Remove all non-digits
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    // Format with commas
    const formatted = Number(numbers).toLocaleString('en-US');
    return `$${formatted}`;
  };

  // Parse budget from formatted string
  const parseBudget = (formatted) => {
    return formatted.replace(/\D/g, '');
  };

  // Toggle functions for collapsible cards
  const toggleCostSaving = (id) => {
    setExpandedCostSavings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSubmittal = (id) => {
    setExpandedSubmittals(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleRFI = (id) => {
    setExpandedRFIs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleChangeOrder = (id) => {
    setExpandedChangeOrders(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const togglePermitComment = (id) => {
    setExpandedPermitComments(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Format phone number with dashes (e.g., 917-239-7013)
  const formatPhone = (phone) => {
    if (!phone) return '';
    // Remove all non-digits
    const numbers = phone.replace(/\D/g, '');
    if (!numbers) return '';
    
    // Format based on length
    if (numbers.length === 10) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    } else if (numbers.length === 11 && numbers[0] === '1') {
      // Handle numbers with country code
      return `${numbers.slice(0, 1)}-${numbers.slice(1, 4)}-${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    }
    // Return as-is if not standard format
    return phone;
  };

  // PDF Export Functions
  const exportToPDF = async (type, project) => {
    // type: 'permits', 'submittals', 'rfis', 'summary'
    
    // Show info message - PDF export will work after migration to self-hosted
    alert('PDF Export feature will be available after migrating to self-hosted version. For now, you can take screenshots of the summary or use browser print (Ctrl/Cmd + P) to save as PDF.');
    return;
    
    /* PDF Export code ready for migration:
    
    // For summary, we don't need specific data items
    if (type === 'summary') {
      const filename = `${project.name.replace(/\s+/g, '_')}_Summary_${new Date().toISOString().split('T')[0]}.pdf`;
      await createPDFWithPython(type, project, null, filename);
      return;
    }
    
    // For other types, get the specific data
    const data = type === 'permits' ? project.permits :
                 type === 'submittals' ? project.submittals :
                 project.rfis;
    
    if (!data || data.length === 0) {
      alert(`No ${type} to export`);
      return;
    }

    const filename = `${project.name.replace(/\s+/g, '_')}_${type}_${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Create PDF using Python (reportlab)
    await createPDFWithPython(type, project, data, filename);
    */
  };

  const createPDFWithPython = async (type, project, data, filename) => {
    // Create Python script to generate PDF
    const pythonScript = `
import sys
import json
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from datetime import datetime
import base64
from io import BytesIO

# Parse input data
data = json.loads(sys.argv[1])
project = data['project']
items = data['items']
doc_type = data['type']
filename = data['filename']

# Create PDF
doc = SimpleDocTemplate(f"/mnt/user-data/outputs/{filename}", pagesize=letter)
styles = getSampleStyleSheet()
story = []

# Custom styles
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=24,
    textColor=colors.HexColor('#1e40af'),
    spaceAfter=30,
    alignment=TA_CENTER
)

header_style = ParagraphStyle(
    'Header',
    parent=styles['Normal'],
    fontSize=12,
    textColor=colors.HexColor('#64748b'),
    alignment=TA_CENTER,
    spaceAfter=6
)

section_style = ParagraphStyle(
    'Section',
    parent=styles['Heading2'],
    fontSize=16,
    textColor=colors.HexColor('#0f172a'),
    spaceBefore=20,
    spaceAfter=12
)

# Add logo if exists
if project.get('logo'):
    try:
        logo_data = base64.b64decode(project['logo'].split(',')[1])
        logo_image = Image(BytesIO(logo_data), width=2*inch, height=1*inch)
        logo_image.hAlign = 'CENTER'
        story.append(logo_image)
        story.append(Spacer(1, 20))
    except:
        pass

# Project Header
story.append(Paragraph(project['name'], title_style))
if project.get('address'):
    story.append(Paragraph(project['address'], header_style))
story.append(Paragraph(f"Generated: {datetime.now().strftime('%m/%d/%Y')}", header_style))
story.append(Spacer(1, 30))

# Section title
doc_title = doc_type.upper()
story.append(Paragraph(doc_title, section_style))
story.append(Spacer(1, 20))

# Add items
for idx, item in enumerate(items):
    # Item number/title box
    item_data = [[Paragraph(f"<b>{item.get('number', f'#{idx+1}')}</b>", styles['Normal'])]]
    
    # Add type/description
    if doc_type == 'permits':
        desc = f"<b>Type:</b> {item.get('type', 'N/A')}<br/><b>Description:</b> {item.get('description', 'N/A')}"
    elif doc_type == 'submittals':
        desc = f"<b>Type:</b> {item.get('type', 'N/A')}<br/><b>Description:</b> {item.get('description', 'N/A')}"
    else:  # rfis
        desc = f"<b>Team:</b> {item.get('responsibleTeam', 'N/A')}<br/><b>Description:</b> {item.get('description', 'N/A')}"
    
    item_data.append([Paragraph(desc, styles['Normal'])])
    
    # Add notes if exists
    if item.get('notes'):
        item_data.append([Paragraph(f"<b>Notes:</b> {item['notes']}", styles['Normal'])])
    
    # Add timestamp
    item_data.append([Paragraph(f"<i>{item.get('timestamp', 'N/A')}</i>", styles['Normal'])])
    
    # Create table for item
    t = Table(item_data, colWidths=[6.5*inch])
    t.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#cbd5e1')),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#f1f5f9')),
        ('PADDING', (0, 0), (-1, -1), 12),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    
    story.append(t)
    story.append(Spacer(1, 15))

# Build PDF
doc.build(story)
print(f"PDF created: {filename}")
`;

    // Prepare data for Python script
    const scriptData = {
      project: {
        name: project.name,
        address: project.address || '',
        logo: project.logo || ''
      },
      items: data,
      type: type,
      filename: filename
    };

    // Write Python script
    await window.storage.set('temp-pdf-script', pythonScript);
    
    // Execute Python script
    try {
      const { bash_tool } = window;
      // Save script
      await bash_tool({
        command: `cat > /tmp/generate_pdf.py << 'EOFSCRIPT'
${pythonScript}
EOFSCRIPT`,
        description: 'Create PDF generation script'
      });

      // Install reportlab if needed
      await bash_tool({
        command: 'pip install reportlab --break-system-packages --quiet || true',
        description: 'Install reportlab'
      });

      // Run script
      const result = await bash_tool({
        command: `python3 /tmp/generate_pdf.py '${JSON.stringify(scriptData).replace(/'/g, "'\"'\"'")}'`,
        description: 'Generate PDF'
      });

      alert(`PDF exported successfully: ${filename}`);
      
      // Trigger download by presenting the file
      const { present_files } = window;
      await present_files({ filepaths: [`/mnt/user-data/outputs/${filename}`] });
      
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  // Load data on mount
  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Load Leaflet library
  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    script.crossOrigin = '';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  // Initialize map when view changes to map
  useEffect(() => {
    if (view === 'map' && projects.length > 0 && window.L && !mapInitialized) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const mapElement = document.getElementById('project-map');
        if (mapElement) {
          initializeMap(projects);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
    
    // Cleanup map when leaving map view
    if (view !== 'map' && mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
      setMapInitialized(false);
    }
  }, [view, projects, mapInitialized]);

  const loadData = async () => {
    console.log('🔄 Starting data load from Supabase...');
    setLoading(true);
    try {
      // CRITICAL: Load projects FIRST to set hasLoadedFromSupabase flag
      console.log('📂 Loading projects...');
      const projectsResult = await window.storage.get('projects');
      let loadedProjects = [];
      if (projectsResult) {
        loadedProjects = JSON.parse(projectsResult.value);
        console.log(`✅ Loaded ${loadedProjects.length} projects from Supabase`);
        setProjects(loadedProjects);
      } else {
        console.log('ℹ️ No existing projects found - starting fresh');
        setProjects([]);
      }

      // Load master tasks
      console.log('📋 Loading master tasks...');
      const tasksResult = await window.storage.get('master-tasks');
      if (tasksResult) {
        setMasterTasks(JSON.parse(tasksResult.value));
      } else {
        // Preload with default checklist from CSV
        const defaultTasks = [{"id":"1000","task":"JPMC Accessibility Design Requirements","team":"Architect","subdivision":"Design","notes":"Architect to Fill out form / AOR ADA Certificate Template","subtasks":[],"createdAt":"2025-12-30T15:26:53.338Z"},{"id":"1001","task":"Complete Project Design Schedule","team":"Architect","subdivision":"Schedule","notes":"Ask architect to provide a complete Design Schedule including meeting reviews","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1002","task":"Building Site Assessment Report","team":"Architect","subdivision":"Design","notes":"Schedule site visit with A&E team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1003","task":"TV Outlet Heights","team":"Architect","subdivision":"Lesson Learned","notes":"Verify all heights on A&E Plans","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1004","task":"Excelon Static Dissipative Tile / MER","team":"Architect","subdivision":"Design","notes":"Spec for MER room","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1005","task":"Gradient Film Spec","team":"Architect","subdivision":"Design","notes":"Full height gradient film/for Client Centers/Check standards website","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1006","task":"Lactation Room Guidelines","team":"Architect","subdivision":"Design","notes":"Review design guideline website","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1007","task":"LEED Sustainability","team":"Architect","subdivision":"Design","notes":"Check Lease & SQFT","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1008","task":"Pantry Equipment Guidelines & Spec","team":"Architect","subdivision":"Design","notes":"Architect to review design Guideline website","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1009","task":"Professional Photography","team":"Architect","subdivision":"Closeout","notes":"Review if its included in proposal / Standard and up","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1010","task":"Design Guidelines","team":"Architect","subdivision":"Design","notes":"Meeting to confirm Guidelines have been met/Architect to review website each week","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1011","task":"Millwork Cabinet / Restroom & Pantry","team":"Architect","subdivision":"Lesson Learned","notes":"Recommend a panel with hinges and 2 handles for easy removal and access","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1012","task":"AOR ADA Certificate Template","team":"Architect","subdivision":"Design","notes":"Download template from Contract Management site","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1013","task":"Sound Masking","team":"Architect","subdivision":"Design","notes":"Plans by A&E team / Coordinate panel location","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1014","task":"Expeditor Services","team":"Architect","subdivision":"Permitting","notes":"Contract Local Expeditor","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1015","task":"Toilet Seat Height","team":"Architect","subdivision":"Lesson Learned","notes":"Make Toilet seat 18\"-19\"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1016","task":"50% Coordinated Review Set","team":"Architect","subdivision":"Schedule","notes":"Architect to provide along with design schedule","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1017","task":"70% Issued for Landlord Review Set","team":"Architect","subdivision":"Schedule","notes":"May not be needed if the 50% has enough information","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1018","task":"90% Page Turn","team":"Architect","subdivision":"Schedule","notes":"Have a call with the Team before the page turn to gather all questions and concerns","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1019","task":"Photometrics Plan","team":"Architect","subdivision":"Design","notes":"Architect to provide with 50% Review","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1020","task":"Permit Set Checklist","team":"Architect","subdivision":"Permitting","notes":"Onboard Expeditor once SD are approved","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1021","task":"Iron Mountain Shred Bin","team":"Architect","subdivision":"Coordination","notes":"Coordinate with FM Team / Architect to design space for Bin","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1022","task":"Concept / Test Fit Design","team":"Architect","subdivision":"Design","notes":"30 Day Schedule / Standard Projects","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1023","task":"Schematic Design (SD)","team":"Architect","subdivision":"Design","notes":"4 Week Schedule / Standard Project","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1024","task":"Door Schedule (Assabloy)","team":"Architect","subdivision":"Design","notes":"Schedule call with Architect/Convergint","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1025","task":"Late Discovery of Hidden Conditions","team":"Architect","subdivision":"Lesson Learned","notes":"Uncover unexpected HVAC/Elec conflicts, Structural surprises during construction","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1026","task":"Incomplete or late design coordination","team":"Architect","subdivision":"Lesson Learned","notes":"AV, IT, Security, Signage, Food Service, not engaged before design sign off","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1027","task":"AV Equipment Testing","team":"AV","subdivision":"Execution & Construction","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1028","task":"TV Mounts","team":"AV","subdivision":"Design","notes":"AV Team provides all the TV mounts","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1029","task":"TV's","team":"AV","subdivision":"Coordination","notes":"AV to provide TV mounting specs / Budget","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1030","task":"GTI / AV Orders","team":"AV","subdivision":"Coordination","notes":"Check GTI & AV orders early, Miss orders cause delays","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1031","task":"Albireo Proposal","team":"Contractor","subdivision":"Proposal","notes":"Include when the project goes out to GC RFP / Submit to MEP/Commissioning","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1032","task":"Long Lead Item / Purchase order","team":"Contractor","subdivision":"Coordination","notes":"GC to provide list of long lead items along with proof of purchase order","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1033","task":"Suite Keys","team":"Contractor","subdivision":"Handover","notes":"GC to provide Keys to FM team, and building engineer","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1034","task":"Atlantic Custom Woodcraft","team":"Contractor","subdivision":"Lesson Learned","notes":"Did a great job at Sarasota / Millworker","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1035","task":"TV Mounts secured to slab","team":"Contractor","subdivision":"Coordination","notes":"GC to secure TV Bracket to slab","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1036","task":"MER Shell Ready","team":"Contractor","subdivision":"Schedule","notes":"GC to provide date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1037","task":"MER Room Ready","team":"Contractor","subdivision":"Schedule","notes":"GC to provide date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1038","task":"MER Production Ready","team":"Contractor","subdivision":"Schedule","notes":"GC to provide date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1039","task":"Circuit Install","team":"Contractor","subdivision":"Construction","notes":"GC to provide date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1040","task":"Required Inspections","team":"Contractor","subdivision":"Schedule","notes":"GC to Provide all Inspections required for the project","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1041","task":"Operational Project Complete","team":"Contractor","subdivision":"Closeout","notes":"GC to complete closeout list below","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1042","task":"Is EPO Required by AHJ?","team":"FM Engineering","subdivision":"Coordination","notes":"JPMC Standard is not to have an EPO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1043","task":"Need to use Daintree Lighting Control","team":"FM Engineering","subdivision":"Design","notes":"Lighting Control System","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1044","task":"TR Rooms / N+1 HVAC Unit","team":"FM Engineering","subdivision":"Design","notes":"TR rooms to have N+1 HVAC unit outside of the room","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1045","task":"IAQ Sensors","team":"FM Engineering","subdivision":"Design","notes":"IAQ Sensors should be JPMC Standard Omni Awair Sensors","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1046","task":"Isolation Valves","team":"FM Engineering","subdivision":"Design","notes":"Supply isolation Valves and sanitary cleanouts for restroom and work cafe","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1047","task":"Pre-Action Sprinkler","team":"FM Engineering","subdivision":"Design","notes":"Technology room sprinkler system should be Pre-Action System","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1048","task":"Leak Detection (Albireo)","team":"FM Engineering","subdivision":"Design","notes":"Add Leak Detection to Albireo Monitoring System","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1049","task":"MER Checklist/Coordination","team":"GTI","subdivision":"Design","notes":"MER TR Standards / MEP Design Guidelines / Commissioning Scope","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1050","task":"MER/TR Combo Rack information","team":"GTI","subdivision":"MER Checklist","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1051","task":"MER/TR Combo Structural Cable Plan","team":"GTI","subdivision":"MER Checklist","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1052","task":"Service Now for GTI / AV Assignment","team":"GTI","subdivision":"Initiate","notes":"Initiate Service Now Ticket to engage GTI, Security & AV","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1053","task":"UPS Specs","team":"GTI","subdivision":"Design","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1054","task":"Order Printers","team":"GTI","subdivision":"Technology Setup","notes":"GTI PM places order for printer with Card Reader","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1055","task":"WAP Location Plan","team":"GTI","subdivision":"Design","notes":"GTI to provide locations / GTI to provide heat map","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1056","task":"UPS Load Study","team":"GTI","subdivision":"Design","notes":"When working inside existing spaces of expansion/Request a load study/Miller Electric","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1057","task":"Lease","team":"Landlord","subdivision":"Initiate","notes":"Provide pre-approved Vendor list/Expiration date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1058","task":"Rules & Regulations","team":"Landlord","subdivision":"Initiate","notes":"Provide Rules & Reg to Design team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1059","task":"Low Voltage Plans","team":"Low Voltage","subdivision":"Design","notes":"Review MER/TR Design with A&E + GTI","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1060","task":"MER Mechanical Units","team":"MEP","subdivision":"MER Checklist","notes":"Review Guidelines","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1061","task":"MEP Design Guidelines v1.3","team":"MEP","subdivision":"MER Checklist","notes":"Review all MER and MEP Guidelines","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1062","task":"Leak Detection in Cafe & MER","team":"MEP","subdivision":"Design","notes":"MEP plans to include leak detection","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1063","task":"Security Proposal","team":"Owner","subdivision":"PO","notes":"Security PO to go under GC/ Ask For Design Proposal","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1064","task":"AV Proposal","team":"Owner","subdivision":"PO","notes":"AV PMaas / Design / Equipment Intall / (3) Proposal","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1065","task":"Test-fit","team":"Owner","subdivision":"Design Start","notes":"Provided first from CW/ With Seat counts","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1066","task":"Agenda / Meeting Minutes","team":"Owner","subdivision":"Project Manager","notes":"Weekly Meeting Minutes","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1067","task":"Amenities Information","team":"Owner","subdivision":"Design","notes":"Issue SD package to amenities team for pricing","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1068","task":"Architect Contract","team":"Owner","subdivision":"PO","notes":"Issue A&E PO / AOR Contract Lump sum","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1069","task":"Architect Onboarding Document","team":"Owner","subdivision":"Onboarding","notes":"Presentation Deck, ADA Documents","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1070","task":"AOR ACC & Sharepoint Access","team":"Owner","subdivision":"Onboarding","notes":"Add Team to ACC for access","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1071","task":"Art / Branding Proposal","team":"Owner","subdivision":"PO","notes":"Studio EL / Need Art Placement plan/Ani-Reflection Film on frame","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1072","task":"AV Room by Room with A&E / GTI","team":"Owner","subdivision":"Coordination","notes":"Review with internal team in weekly meeting","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1073","task":"BID Waivers","team":"Owner","subdivision":"Initiate","notes":"Email approved vendors to Mike","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1074","task":"BIM Access","team":"Owner","subdivision":"Initiate","notes":"Is BIM access required?","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1075","task":"Cad Files to GTI / AV","team":"Owner","subdivision":"Coordination","notes":"Upload CAD files to ACC for Team access","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1076","task":"SD Design Package / LOB","team":"Owner","subdivision":"LOB","notes":"Submit SD package with 3D views for LOB approval","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1077","task":"Closeout Checklist","team":"Owner","subdivision":"Closeout","notes":"See List","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1078","task":"Change Management","team":"Owner","subdivision":"Project Manager","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1079","task":"Cushman Wakefeild Test-fit Intake","team":"Owner","subdivision":"Initiate","notes":"Intake form provided by PM team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1080","task":"Change Orders","team":"Owner","subdivision":"Project Manager","notes":"Invoices need vendor email contact in PMWeb","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1081","task":"Due Diligence Report / Lease","team":"Owner","subdivision":"Initiate","notes":"Issue To Lease transaction along with testfit","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1082","task":"Furniture","team":"Owner","subdivision":"PO","notes":"Front office / Client Center / $250 sqft pricing Client centers","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1083","task":"Furniture Storage","team":"Owner","subdivision":"Coordination","notes":"Review with FM / AOR","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1084","task":"GC Lump Sum / GMP","team":"Owner","subdivision":"Bidding","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1085","task":"Handover Checklist","team":"Owner","subdivision":"Handover","notes":"Confirm checklist in PMWeb for closeout / Click save after submit","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1086","task":"Letter of Recommendation for AOR & GC","team":"Owner","subdivision":"Initiate","notes":"Get Letter from Past project","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1087","task":"PMWeb Initial Setup","team":"Owner","subdivision":"Initiate","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1088","task":"RAID Risk Assumptions Issues Dependencies","team":"Owner","subdivision":"Initiate","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1089","task":"Resiliency #4 LVL","team":"Owner","subdivision":"Initiate","notes":"Selected & Submitted to team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1090","task":"Cost Consultant","team":"Owner","subdivision":"Initiate","notes":"AS if required at project start","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1091","task":"Resiliency #3 LVL","team":"Owner","subdivision":"Initiate","notes":"Selected & Submitted to team / Included in intake form by program team / Client centers","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1092","task":"General Contractor / RFP","team":"Owner","subdivision":"Bidding","notes":"GC / Pre-con GC","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1093","task":"Scheduling Consultant","team":"Owner","subdivision":"Initiate","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1094","task":"3rd Party Oversight Consultant","team":"Owner","subdivision":"Initiate","notes":"Ask if this is needed at project start","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1095","task":"Testing & Commissioning","team":"Owner","subdivision":"PO","notes":"RDA is preferred Commissioning engineer $30K / Can add to GC proposal","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1096","task":"Schedule - Microsoft & PMWeb","team":"Owner","subdivision":"Schedule","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1097","task":"Scope Requirements & Team List","team":"Owner","subdivision":"Initiate","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1098","task":"Signage Information/ Eaglemaster","team":"Owner","subdivision":"PO","notes":"Proposal from Phili  Synco/ Eaglemaster / Judy Dominey JPMC/Could have 2 vendors","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1099","task":"Site Pictures","team":"Owner","subdivision":"Project Manager","notes":"Upload to ACC / PMWEB","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1100","task":"Soft Phone Deployment","team":"Owner","subdivision":"Technology Setup","notes":"Hard Phone Location/Coordinate with Technology team & Furniture","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1101","task":"Identify Project Key Stakeholders","team":"Owner","subdivision":"Initiate","notes":"See Excel list/ See Meeting minutes from past project","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1102","task":"Project Profile","team":"Owner","subdivision":"Initiate","notes":"Set up in PMWeb","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1103","task":"Kick off call with Global Design","team":"Owner","subdivision":"Global Design","notes":"Only for Enhanced Projects","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1104","task":"UPS Technician","team":"Owner","subdivision":"PO","notes":"Need a proposal for UPS server room work 610.337.7650","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1105","task":"Stock up toilet paper & Towels","team":"Owner","subdivision":"Lesson Learned","notes":"Coordinate with FM Team / Add to tracker","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1106","task":"Entry Door Hardware Fully Operational","team":"Owner","subdivision":"Handover","notes":"Confirm door hardware and access control fully operational before handover (no temporary conditions).","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1107","task":"Asbestos Survey","team":"Owner","subdivision":"PO","notes":"APEX Companies Approved in PMWeb/Sara to email PO $3K","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1108","task":"Convergint /Under GC","team":"Owner","subdivision":"PO","notes":"Convegint team damages ceiling tiles after construction is complete/Provides CAD file after PO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1109","task":"Benchmark Pricing","team":"Owner","subdivision":"Cerp","notes":"Use Benchmark Comparison Tool / Corporate Budget Guidance","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1110","task":"CERP Budget W/Benchmark","team":"Owner","subdivision":"Cerp","notes":"Look at 411 S county for reference","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1111","task":"Governance Approval","team":"Owner","subdivision":"Cerp","notes":"1M goes to Regional / 10M goes to SteerCo","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1112","task":"Project Suite #","team":"Owner","subdivision":"Initiate","notes":"Need to show correct Suite number on Plans","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1113","task":"Hypothetical Space ID Numbers","team":"Owner","subdivision":"Design","notes":"Get cad file / Assess cad portal to upload cad and get numbers","subtasks":[{"id":"1113-0","text":"Cad portal websiteILook up CAD file in cad portal","completed":false}],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1114","task":"Standard Design Playbook","team":"Owner","subdivision":"Onboarding","notes":"This is the workflow for Standard small Projects","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1115","task":"Poor Vendor Payment Terms Alignment","team":"Owner","subdivision":"Lesson Learned","notes":"PMWeb system defaulting to payment terms net 25, net 60 different from contract","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1116","task":"Procurement Strategy","team":"Owner","subdivision":"Initiate","notes":"A&E RFP Submittal / Approval/ Interviews/ Bid Leveling","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1117","task":"Full Funding","team":"Owner","subdivision":"Initiate","notes":"Governance/Regional/Route Budget/A&E Contract PO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1118","task":"Moving Company","team":"Owner","subdivision":"PO","notes":"Coordinate with FM team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1119","task":"Security Door to Desk","team":"Security","subdivision":"Design","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1120","task":"Tourlocks & Speed Lanes","team":"Security","subdivision":"Design","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1121","task":"Security Lead time Dashboard","team":"Security","subdivision":"Coordination","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1122","task":"Security Preliminary Drawings","team":"Security","subdivision":"Design","notes":"Needs cad files & SD package","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1123","task":"SPM Submittal","team":"Security","subdivision":"Coordination","notes":"Security Engagement","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1124","task":"Confirm Intercom Location","team":"Security","subdivision":"Coordination","notes":"Confirm Location of Intercom / Wall or Desk mounted","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1125","task":"Security Access Control Permit","team":"Security","subdivision":"Permitting","notes":"Low Voltage/Security permit Will need master permit first","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1126","task":"Schedule Site Assessment Report","team":"Standard Playbook","subdivision":"Initiate","notes":"Schedule Site visit with RDA/Request Proposal","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1127","task":"Review Deign Proposal with Schedule","team":"Standard Playbook","subdivision":"Initiate","notes":"Issue PO to Architect","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1128","task":"Issue Design Standard documents","team":"Standard Playbook","subdivision":"Initiate","notes":"See Documents List","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1129","task":"Onboarding Presentation Deck","team":"Standard Playbook","subdivision":"Initiate","notes":"Issue Key Milestone Dates","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1130","task":"Schedule Site survey","team":"Standard Playbook","subdivision":"Design Start","notes":"2 Weeks to complete","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1131","task":"Schedule 1st Team meeting","team":"Standard Playbook","subdivision":"Design Start","notes":"Schedule 1st Internal team Call","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1132","task":"Design Deliverables","team":"Standard Playbook","subdivision":"Design Start","notes":"See Deliveriable List","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1133","task":"Approve Test-fit","team":"Standard Playbook","subdivision":"Design Start","notes":"Approval to proceed to Schematic Design","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1134","task":"Request Security start preliminary plans","team":"Standard Playbook","subdivision":"Design Start","notes":"Issue PO to Security","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1135","task":"Request GTI provide WAP Plan","team":"Standard Playbook","subdivision":"Design Start","notes":"GTI to provide schedule for WAP Plan","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1136","task":"Low Voltage Team start on TR room design","team":"Standard Playbook","subdivision":"Design Start","notes":"TR/MER Room Design Review","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1137","task":"Request Hypothetical Numbers","team":"Standard Playbook","subdivision":"Design Start","notes":"Request Floor plan numbers","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1138","task":"Request GC RFP Approval","team":"Standard Playbook","subdivision":"Design Start","notes":"Email Mike for GC approval","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1139","task":"Set up GC RFP Package / Dates","team":"Standard Playbook","subdivision":"Design Start","notes":"RFP Dates","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1140","task":"Request Asbestos proposal","team":"Standard Playbook","subdivision":"PO","notes":"Issue PO for Abestos report","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1141","task":"Start SD Package","team":"Standard Playbook","subdivision":"Schematic Design","notes":"Demo/Partition/Power/RCP/Finish Plans","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1142","task":"Design Review meeting","team":"Standard Playbook","subdivision":"Schematic Design","notes":"Call with GTI/Security/AV Room by Room Meeting","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1143","task":"Schematic Design Deliverables","team":"Standard Playbook","subdivision":"Schematic Design","notes":"See SD List","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1144","task":"SD Review meetings","team":"Standard Playbook","subdivision":"Schematic Design","notes":"SD Meeting 1 & 2","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1145","task":"Schematic Design Approval","team":"Standard Playbook","subdivision":"Schematic Design","notes":"Start CD's","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1146","task":"Request AV Proposal","team":"Standard Playbook","subdivision":"PO","notes":"AV Proposal & PO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1147","task":"Request Security Proposal","team":"Standard Playbook","subdivision":"PO","notes":"Issue Security Design PO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1148","task":"Request Signage Proposal","team":"Standard Playbook","subdivision":"PO","notes":"Proposal from Eaglemaster","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1149","task":"Request Furniture Proposal","team":"Standard Playbook","subdivision":"Schematic Design","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1150","task":"Request Pantry Equipment Proposal","team":"Standard Playbook","subdivision":"Schematic Design","notes":"Send plans with elevations and specs","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1151","task":"Program Confirmed","team":"Standard Playbook","subdivision":"Design Start","notes":"LOB to approve","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1152","task":"TR/MER Room Approved","team":"Standard Playbook","subdivision":"Design Start","notes":"GTI To approve","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"}];
        setMasterTasks(defaultTasks);
        await window.storage.set('master-tasks', JSON.stringify(defaultTasks));
      }

      // Load contacts
      const contactsResult = await window.storage.get('contacts');
      if (contactsResult) {
        setContacts(JSON.parse(contactsResult.value));
      }

      // Load performance reviews
      const reviewsResult = await window.storage.get('performance-reviews');
      if (reviewsResult) {
        setPerformanceReviews(normalizePerformanceReviews(JSON.parse(reviewsResult.value), loadedProjects));
      }

      // Load custom teams
      const teamsResult = await window.storage.get('custom-teams');
      if (teamsResult) {
        const parsedTeams = JSON.parse(teamsResult.value);
        const sanitizedTeams = sanitizeCustomTeams(parsedTeams);
        setCustomTeams(sanitizedTeams);
        if (JSON.stringify(parsedTeams) !== JSON.stringify(sanitizedTeams)) {
          await window.storage.set('custom-teams', JSON.stringify(sanitizedTeams));
        }
      }

      // Load custom subdivisions
      const subdivResult = await window.storage.get('custom-subdivisions');
      if (subdivResult) {
        setCustomSubdivisions(JSON.parse(subdivResult.value));
      }

      // Load custom project types
      const typesResult = await window.storage.get('custom-project-types');
      if (typesResult) {
        setCustomProjectTypes(JSON.parse(typesResult.value));
      }
    } catch (error) {
      console.log('First time setup - no existing data, loading default checklist');
      // Preload with default checklist from CSV on first run
      const defaultTasks = [{"id":"1000","task":"JPMC Accessibility Design Requirements","team":"Architect","subdivision":"Design","notes":"Architect to Fill out form / AOR ADA Certificate Template","subtasks":[],"createdAt":"2025-12-30T15:26:53.338Z"},{"id":"1001","task":"Complete Project Design Schedule","team":"Architect","subdivision":"Schedule","notes":"Ask architect to provide a complete Design Schedule including meeting reviews","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1002","task":"Building Site Assessment Report","team":"Architect","subdivision":"Design","notes":"Schedule site visit with A&E team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1003","task":"TV Outlet Heights","team":"Architect","subdivision":"Lesson Learned","notes":"Verify all heights on A&E Plans","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1004","task":"Excelon Static Dissipative Tile / MER","team":"Architect","subdivision":"Design","notes":"Spec for MER room","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1005","task":"Gradient Film Spec","team":"Architect","subdivision":"Design","notes":"Full height gradient film/for Client Centers/Check standards website","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1006","task":"Lactation Room Guidelines","team":"Architect","subdivision":"Design","notes":"Review design guideline website","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1007","task":"LEED Sustainability","team":"Architect","subdivision":"Design","notes":"Check Lease & SQFT","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1008","task":"Pantry Equipment Guidelines & Spec","team":"Architect","subdivision":"Design","notes":"Architect to review design Guideline website","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1009","task":"Professional Photography","team":"Architect","subdivision":"Closeout","notes":"Review if its included in proposal / Standard and up","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1010","task":"Design Guidelines","team":"Architect","subdivision":"Design","notes":"Meeting to confirm Guidelines have been met/Architect to review website each week","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1011","task":"Millwork Cabinet / Restroom & Pantry","team":"Architect","subdivision":"Lesson Learned","notes":"Recommend a panel with hinges and 2 handles for easy removal and access","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1012","task":"AOR ADA Certificate Template","team":"Architect","subdivision":"Design","notes":"Download template from Contract Management site","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1013","task":"Sound Masking","team":"Architect","subdivision":"Design","notes":"Plans by A&E team / Coordinate panel location","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1014","task":"Expeditor Services","team":"Architect","subdivision":"Permitting","notes":"Contract Local Expeditor","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1015","task":"Toilet Seat Height","team":"Architect","subdivision":"Lesson Learned","notes":"Make Toilet seat 18\"-19\"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1016","task":"50% Coordinated Review Set","team":"Architect","subdivision":"Schedule","notes":"Architect to provide along with design schedule","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1017","task":"70% Issued for Landlord Review Set","team":"Architect","subdivision":"Schedule","notes":"May not be needed if the 50% has enough information","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1018","task":"90% Page Turn","team":"Architect","subdivision":"Schedule","notes":"Have a call with the Team before the page turn to gather all questions and concerns","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1019","task":"Photometrics Plan","team":"Architect","subdivision":"Design","notes":"Architect to provide with 50% Review","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1020","task":"Permit Set Checklist","team":"Architect","subdivision":"Permitting","notes":"Onboard Expeditor once SD are approved","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1021","task":"Iron Mountain Shred Bin","team":"Architect","subdivision":"Coordination","notes":"Coordinate with FM Team / Architect to design space for Bin","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1022","task":"Concept / Test Fit Design","team":"Architect","subdivision":"Design","notes":"30 Day Schedule / Standard Projects","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1023","task":"Schematic Design (SD)","team":"Architect","subdivision":"Design","notes":"4 Week Schedule / Standard Project","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1024","task":"Door Schedule (Assabloy)","team":"Architect","subdivision":"Design","notes":"Schedule call with Architect/Convergint","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1025","task":"Late Discovery of Hidden Conditions","team":"Architect","subdivision":"Lesson Learned","notes":"Uncover unexpected HVAC/Elec conflicts, Structural surprises during construction","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1026","task":"Incomplete or late design coordination","team":"Architect","subdivision":"Lesson Learned","notes":"AV, IT, Security, Signage, Food Service, not engaged before design sign off","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1027","task":"AV Equipment Testing","team":"AV","subdivision":"Execution & Construction","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1028","task":"TV Mounts","team":"AV","subdivision":"Design","notes":"AV Team provides all the TV mounts","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1029","task":"TV's","team":"AV","subdivision":"Coordination","notes":"AV to provide TV mounting specs / Budget","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1030","task":"GTI / AV Orders","team":"AV","subdivision":"Coordination","notes":"Check GTI & AV orders early, Miss orders cause delays","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1031","task":"Albireo Proposal","team":"Contractor","subdivision":"Proposal","notes":"Include when the project goes out to GC RFP / Submit to MEP/Commissioning","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1032","task":"Long Lead Item / Purchase order","team":"Contractor","subdivision":"Coordination","notes":"GC to provide list of long lead items along with proof of purchase order","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1033","task":"Suite Keys","team":"Contractor","subdivision":"Handover","notes":"GC to provide Keys to FM team, and building engineer","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1034","task":"Atlantic Custom Woodcraft","team":"Contractor","subdivision":"Lesson Learned","notes":"Did a great job at Sarasota / Millworker","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1035","task":"TV Mounts secured to slab","team":"Contractor","subdivision":"Coordination","notes":"GC to secure TV Bracket to slab","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1036","task":"MER Shell Ready","team":"Contractor","subdivision":"Schedule","notes":"GC to provide date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1037","task":"MER Room Ready","team":"Contractor","subdivision":"Schedule","notes":"GC to provide date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1038","task":"MER Production Ready","team":"Contractor","subdivision":"Schedule","notes":"GC to provide date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1039","task":"Circuit Install","team":"Contractor","subdivision":"Construction","notes":"GC to provide date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1040","task":"Required Inspections","team":"Contractor","subdivision":"Schedule","notes":"GC to Provide all Inspections required for the project","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1041","task":"Operational Project Complete","team":"Contractor","subdivision":"Closeout","notes":"GC to complete closeout list below","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1042","task":"Is EPO Required by AHJ?","team":"FM Engineering","subdivision":"Coordination","notes":"JPMC Standard is not to have an EPO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1043","task":"Need to use Daintree Lighting Control","team":"FM Engineering","subdivision":"Design","notes":"Lighting Control System","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1044","task":"TR Rooms / N+1 HVAC Unit","team":"FM Engineering","subdivision":"Design","notes":"TR rooms to have N+1 HVAC unit outside of the room","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1045","task":"IAQ Sensors","team":"FM Engineering","subdivision":"Design","notes":"IAQ Sensors should be JPMC Standard Omni Awair Sensors","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1046","task":"Isolation Valves","team":"FM Engineering","subdivision":"Design","notes":"Supply isolation Valves and sanitary cleanouts for restroom and work cafe","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1047","task":"Pre-Action Sprinkler","team":"FM Engineering","subdivision":"Design","notes":"Technology room sprinkler system should be Pre-Action System","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1048","task":"Leak Detection (Albireo)","team":"FM Engineering","subdivision":"Design","notes":"Add Leak Detection to Albireo Monitoring System","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1049","task":"MER Checklist/Coordination","team":"GTI","subdivision":"Design","notes":"MER TR Standards / MEP Design Guidelines / Commissioning Scope","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1050","task":"MER/TR Combo Rack information","team":"GTI","subdivision":"MER Checklist","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1051","task":"MER/TR Combo Structural Cable Plan","team":"GTI","subdivision":"MER Checklist","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1052","task":"Service Now for GTI / AV Assignment","team":"GTI","subdivision":"Initiate","notes":"Initiate Service Now Ticket to engage GTI, Security & AV","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1053","task":"UPS Specs","team":"GTI","subdivision":"Design","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1054","task":"Order Printers","team":"GTI","subdivision":"Technology Setup","notes":"GTI PM places order for printer with Card Reader","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1055","task":"WAP Location Plan","team":"GTI","subdivision":"Design","notes":"GTI to provide locations / GTI to provide heat map","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1056","task":"UPS Load Study","team":"GTI","subdivision":"Design","notes":"When working inside existing spaces of expansion/Request a load study/Miller Electric","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1057","task":"Lease","team":"Landlord","subdivision":"Initiate","notes":"Provide pre-approved Vendor list/Expiration date","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1058","task":"Rules & Regulations","team":"Landlord","subdivision":"Initiate","notes":"Provide Rules & Reg to Design team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1059","task":"Low Voltage Plans","team":"Low Voltage","subdivision":"Design","notes":"Review MER/TR Design with A&E + GTI","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1060","task":"MER Mechanical Units","team":"MEP","subdivision":"MER Checklist","notes":"Review Guidelines","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1061","task":"MEP Design Guidelines v1.3","team":"MEP","subdivision":"MER Checklist","notes":"Review all MER and MEP Guidelines","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1062","task":"Leak Detection in Cafe & MER","team":"MEP","subdivision":"Design","notes":"MEP plans to include leak detection","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1063","task":"Security Proposal","team":"Owner","subdivision":"PO","notes":"Security PO to go under GC/ Ask For Design Proposal","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1064","task":"AV Proposal","team":"Owner","subdivision":"PO","notes":"AV PMaas / Design / Equipment Intall / (3) Proposal","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1065","task":"Test-fit","team":"Owner","subdivision":"Design Start","notes":"Provided first from CW/ With Seat counts","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1066","task":"Agenda / Meeting Minutes","team":"Owner","subdivision":"Project Manager","notes":"Weekly Meeting Minutes","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1067","task":"Amenities Information","team":"Owner","subdivision":"Design","notes":"Issue SD package to amenities team for pricing","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1068","task":"Architect Contract","team":"Owner","subdivision":"PO","notes":"Issue A&E PO / AOR Contract Lump sum","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1069","task":"Architect Onboarding Document","team":"Owner","subdivision":"Onboarding","notes":"Presentation Deck, ADA Documents","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1070","task":"AOR ACC & Sharepoint Access","team":"Owner","subdivision":"Onboarding","notes":"Add Team to ACC for access","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1071","task":"Art / Branding Proposal","team":"Owner","subdivision":"PO","notes":"Studio EL / Need Art Placement plan/Ani-Reflection Film on frame","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1072","task":"AV Room by Room with A&E / GTI","team":"Owner","subdivision":"Coordination","notes":"Review with internal team in weekly meeting","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1073","task":"BID Waivers","team":"Owner","subdivision":"Initiate","notes":"Email approved vendors to Mike","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1074","task":"BIM Access","team":"Owner","subdivision":"Initiate","notes":"Is BIM access required?","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1075","task":"Cad Files to GTI / AV","team":"Owner","subdivision":"Coordination","notes":"Upload CAD files to ACC for Team access","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1076","task":"SD Design Package / LOB","team":"Owner","subdivision":"LOB","notes":"Submit SD package with 3D views for LOB approval","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1077","task":"Closeout Checklist","team":"Owner","subdivision":"Closeout","notes":"See List","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1078","task":"Change Management","team":"Owner","subdivision":"Project Manager","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1079","task":"Cushman Wakefeild Test-fit Intake","team":"Owner","subdivision":"Initiate","notes":"Intake form provided by PM team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1080","task":"Change Orders","team":"Owner","subdivision":"Project Manager","notes":"Invoices need vendor email contact in PMWeb","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1081","task":"Due Diligence Report / Lease","team":"Owner","subdivision":"Initiate","notes":"Issue To Lease transaction along with testfit","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1082","task":"Furniture","team":"Owner","subdivision":"PO","notes":"Front office / Client Center / $250 sqft pricing Client centers","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1083","task":"Furniture Storage","team":"Owner","subdivision":"Coordination","notes":"Review with FM / AOR","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1084","task":"GC Lump Sum / GMP","team":"Owner","subdivision":"Bidding","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1085","task":"Handover Checklist","team":"Owner","subdivision":"Handover","notes":"Confirm checklist in PMWeb for closeout / Click save after submit","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1086","task":"Letter of Recommendation for AOR & GC","team":"Owner","subdivision":"Initiate","notes":"Get Letter from Past project","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1087","task":"PMWeb Initial Setup","team":"Owner","subdivision":"Initiate","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1088","task":"RAID Risk Assumptions Issues Dependencies","team":"Owner","subdivision":"Initiate","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1089","task":"Resiliency #4 LVL","team":"Owner","subdivision":"Initiate","notes":"Selected & Submitted to team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1090","task":"Cost Consultant","team":"Owner","subdivision":"Initiate","notes":"AS if required at project start","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1091","task":"Resiliency #3 LVL","team":"Owner","subdivision":"Initiate","notes":"Selected & Submitted to team / Included in intake form by program team / Client centers","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1092","task":"General Contractor / RFP","team":"Owner","subdivision":"Bidding","notes":"GC / Pre-con GC","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1093","task":"Scheduling Consultant","team":"Owner","subdivision":"Initiate","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1094","task":"3rd Party Oversight Consultant","team":"Owner","subdivision":"Initiate","notes":"Ask if this is needed at project start","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1095","task":"Testing & Commissioning","team":"Owner","subdivision":"PO","notes":"RDA is preferred Commissioning engineer $30K / Can add to GC proposal","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1096","task":"Schedule - Microsoft & PMWeb","team":"Owner","subdivision":"Schedule","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1097","task":"Scope Requirements & Team List","team":"Owner","subdivision":"Initiate","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1098","task":"Signage Information/ Eaglemaster","team":"Owner","subdivision":"PO","notes":"Proposal from Phili  Synco/ Eaglemaster / Judy Dominey JPMC/Could have 2 vendors","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1099","task":"Site Pictures","team":"Owner","subdivision":"Project Manager","notes":"Upload to ACC / PMWEB","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1100","task":"Soft Phone Deployment","team":"Owner","subdivision":"Technology Setup","notes":"Hard Phone Location/Coordinate with Technology team & Furniture","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1101","task":"Identify Project Key Stakeholders","team":"Owner","subdivision":"Initiate","notes":"See Excel list/ See Meeting minutes from past project","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1102","task":"Project Profile","team":"Owner","subdivision":"Initiate","notes":"Set up in PMWeb","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1103","task":"Kick off call with Global Design","team":"Owner","subdivision":"Global Design","notes":"Only for Enhanced Projects","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1104","task":"UPS Technician","team":"Owner","subdivision":"PO","notes":"Need a proposal for UPS server room work 610.337.7650","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1105","task":"Stock up toilet paper & Towels","team":"Owner","subdivision":"Lesson Learned","notes":"Coordinate with FM Team / Add to tracker","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1106","task":"Entry Door Hardware Fully Operational","team":"Owner","subdivision":"Handover","notes":"Confirm door hardware and access control fully operational before handover (no temporary conditions).","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1107","task":"Asbestos Survey","team":"Owner","subdivision":"PO","notes":"APEX Companies Approved in PMWeb/Sara to email PO $3K","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1108","task":"Convergint /Under GC","team":"Owner","subdivision":"PO","notes":"Convegint team damages ceiling tiles after construction is complete/Provides CAD file after PO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1109","task":"Benchmark Pricing","team":"Owner","subdivision":"Cerp","notes":"Use Benchmark Comparison Tool / Corporate Budget Guidance","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1110","task":"CERP Budget W/Benchmark","team":"Owner","subdivision":"Cerp","notes":"Look at 411 S county for reference","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1111","task":"Governance Approval","team":"Owner","subdivision":"Cerp","notes":"1M goes to Regional / 10M goes to SteerCo","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1112","task":"Project Suite #","team":"Owner","subdivision":"Initiate","notes":"Need to show correct Suite number on Plans","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1113","task":"Hypothetical Space ID Numbers","team":"Owner","subdivision":"Design","notes":"Get cad file / Assess cad portal to upload cad and get numbers","subtasks":[{"id":"1113-0","text":"Cad portal websiteILook up CAD file in cad portal","completed":false}],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1114","task":"Standard Design Playbook","team":"Owner","subdivision":"Onboarding","notes":"This is the workflow for Standard small Projects","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1115","task":"Poor Vendor Payment Terms Alignment","team":"Owner","subdivision":"Lesson Learned","notes":"PMWeb system defaulting to payment terms net 25, net 60 different from contract","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1116","task":"Procurement Strategy","team":"Owner","subdivision":"Initiate","notes":"A&E RFP Submittal / Approval/ Interviews/ Bid Leveling","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1117","task":"Full Funding","team":"Owner","subdivision":"Initiate","notes":"Governance/Regional/Route Budget/A&E Contract PO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1118","task":"Moving Company","team":"Owner","subdivision":"PO","notes":"Coordinate with FM team","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1119","task":"Security Door to Desk","team":"Security","subdivision":"Design","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1120","task":"Tourlocks & Speed Lanes","team":"Security","subdivision":"Design","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1121","task":"Security Lead time Dashboard","team":"Security","subdivision":"Coordination","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1122","task":"Security Preliminary Drawings","team":"Security","subdivision":"Design","notes":"Needs cad files & SD package","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1123","task":"SPM Submittal","team":"Security","subdivision":"Coordination","notes":"Security Engagement","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1124","task":"Confirm Intercom Location","team":"Security","subdivision":"Coordination","notes":"Confirm Location of Intercom / Wall or Desk mounted","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1125","task":"Security Access Control Permit","team":"Security","subdivision":"Permitting","notes":"Low Voltage/Security permit Will need master permit first","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1126","task":"Schedule Site Assessment Report","team":"Standard Playbook","subdivision":"Initiate","notes":"Schedule Site visit with RDA/Request Proposal","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1127","task":"Review Deign Proposal with Schedule","team":"Standard Playbook","subdivision":"Initiate","notes":"Issue PO to Architect","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1128","task":"Issue Design Standard documents","team":"Standard Playbook","subdivision":"Initiate","notes":"See Documents List","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1129","task":"Onboarding Presentation Deck","team":"Standard Playbook","subdivision":"Initiate","notes":"Issue Key Milestone Dates","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1130","task":"Schedule Site survey","team":"Standard Playbook","subdivision":"Design Start","notes":"2 Weeks to complete","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1131","task":"Schedule 1st Team meeting","team":"Standard Playbook","subdivision":"Design Start","notes":"Schedule 1st Internal team Call","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1132","task":"Design Deliverables","team":"Standard Playbook","subdivision":"Design Start","notes":"See Deliveriable List","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1133","task":"Approve Test-fit","team":"Standard Playbook","subdivision":"Design Start","notes":"Approval to proceed to Schematic Design","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1134","task":"Request Security start preliminary plans","team":"Standard Playbook","subdivision":"Design Start","notes":"Issue PO to Security","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1135","task":"Request GTI provide WAP Plan","team":"Standard Playbook","subdivision":"Design Start","notes":"GTI to provide schedule for WAP Plan","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1136","task":"Low Voltage Team start on TR room design","team":"Standard Playbook","subdivision":"Design Start","notes":"TR/MER Room Design Review","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1137","task":"Request Hypothetical Numbers","team":"Standard Playbook","subdivision":"Design Start","notes":"Request Floor plan numbers","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1138","task":"Request GC RFP Approval","team":"Standard Playbook","subdivision":"Design Start","notes":"Email Mike for GC approval","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1139","task":"Set up GC RFP Package / Dates","team":"Standard Playbook","subdivision":"Design Start","notes":"RFP Dates","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1140","task":"Request Asbestos proposal","team":"Standard Playbook","subdivision":"PO","notes":"Issue PO for Abestos report","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1141","task":"Start SD Package","team":"Standard Playbook","subdivision":"Schematic Design","notes":"Demo/Partition/Power/RCP/Finish Plans","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1142","task":"Design Review meeting","team":"Standard Playbook","subdivision":"Schematic Design","notes":"Call with GTI/Security/AV Room by Room Meeting","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1143","task":"Schematic Design Deliverables","team":"Standard Playbook","subdivision":"Schematic Design","notes":"See SD List","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1144","task":"SD Review meetings","team":"Standard Playbook","subdivision":"Schematic Design","notes":"SD Meeting 1 & 2","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1145","task":"Schematic Design Approval","team":"Standard Playbook","subdivision":"Schematic Design","notes":"Start CD's","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1146","task":"Request AV Proposal","team":"Standard Playbook","subdivision":"PO","notes":"AV Proposal & PO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1147","task":"Request Security Proposal","team":"Standard Playbook","subdivision":"PO","notes":"Issue Security Design PO","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1148","task":"Request Signage Proposal","team":"Standard Playbook","subdivision":"PO","notes":"Proposal from Eaglemaster","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1149","task":"Request Furniture Proposal","team":"Standard Playbook","subdivision":"Schematic Design","notes":"","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1150","task":"Request Pantry Equipment Proposal","team":"Standard Playbook","subdivision":"Schematic Design","notes":"Send plans with elevations and specs","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1151","task":"Program Confirmed","team":"Standard Playbook","subdivision":"Design Start","notes":"LOB to approve","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"},{"id":"1152","task":"TR/MER Room Approved","team":"Standard Playbook","subdivision":"Design Start","notes":"GTI To approve","subtasks":[],"createdAt":"2025-12-30T15:26:53.339Z"}];
      setMasterTasks(defaultTasks);
      // Save default tasks to storage
      try {
        await window.storage.set('master-tasks', JSON.stringify(defaultTasks));
      } catch (storageError) {
        console.log('Could not save default tasks to storage:', storageError);
      }
    }
    setLoading(false);
  };

  const saveProjects = async (projectsToSave) => {
    const now = new Date().toISOString();
    let preparedProjects = projectsToSave;
    try {
      const currentMap = new Map(projects.map(project => [project.id, project]));
      preparedProjects = projectsToSave.map(project => {
        const current = currentMap.get(project.id);
        if (!current) {
          return { ...project, updatedAt: now };
        }
        const currentSnapshot = JSON.stringify(current);
        const nextSnapshot = JSON.stringify(project);
        if (currentSnapshot !== nextSnapshot) {
          return { ...project, updatedAt: now };
        }
        return project;
      });
    } catch (error) {
      console.warn('Failed to diff projects before save, forcing updatedAt.', error);
      preparedProjects = projectsToSave.map(project => ({ ...project, updatedAt: now }));
    }

    const result = await window.storage.set('projects', JSON.stringify(preparedProjects));
    try {
      const refreshed = await window.storage.get('projects');
      if (refreshed) {
        const loadedProjects = JSON.parse(refreshed.value);
        setProjects(loadedProjects);
        if (selectedProject?.id) {
          const updatedSelected = loadedProjects.find(p => p.id === selectedProject.id);
          if (updatedSelected) {
            setSelectedProject(updatedSelected);
          }
        }
      }
    } catch (error) {
      console.error('Failed to refresh projects after save:', error);
    }
    return result;
  };

  const saveProjectsDebounced = (projectsToSave, delayMs = 400) => {
    pendingSaveRef.current = projectsToSave;
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(() => {
      const pending = pendingSaveRef.current;
      pendingSaveRef.current = null;
      saveTimerRef.current = null;
      if (pending) {
        saveProjects(pending);
      }
    }, delayMs);
  };

  // Export all data to JSON file
  const exportData = () => {
    try {
      const exportData = {
        version: STORAGE_CONFIG.version,
        exportDate: new Date().toISOString(),
        projects: projects,
        contacts: contacts,
        masterTasks: masterTasks,
        allTeams: sanitizeCustomTeams(customTeams)
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cre-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('✅ Data exported successfully! Save this file in a safe place.');
    } catch (error) {
      console.error('Export error:', error);
      alert('❌ Error exporting data. Please try again.');
    }
  };

  // Import data from JSON file
  const importData = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedData = JSON.parse(text);

      // Validate the data structure
      if (!importedData.version || !importedData.exportDate) {
        alert('❌ Invalid backup file format.');
        return;
      }

      // Confirm before overwriting
      const confirm = window.confirm(
        `⚠️ This will replace all current data with the backup from ${new Date(importedData.exportDate).toLocaleDateString()}.\n\nAre you sure you want to continue?`
      );

      if (!confirm) return;

      // Import projects
      if (importedData.projects) {
        setProjects(importedData.projects);
        await saveProjects(importedData.projects);
      }

      // Import contacts
      if (importedData.contacts) {
        setContacts(importedData.contacts);
        await window.storage.set('contacts', JSON.stringify(importedData.contacts));
      }

      // Import master tasks
      if (importedData.masterTasks) {
        setMasterTasks(importedData.masterTasks);
        await window.storage.set('master-tasks', JSON.stringify(importedData.masterTasks));
      }

      // Import teams (stored as customTeams)
      if (importedData.allTeams) {
        const sanitizedTeams = sanitizeCustomTeams(importedData.allTeams);
        setCustomTeams(sanitizedTeams);
        await window.storage.set('custom-teams', JSON.stringify(sanitizedTeams));
      }

      alert('✅ Data imported successfully! The page will now reload.');
      window.location.reload();
    } catch (error) {
      console.error('Import error:', error);
      alert('❌ Error importing data. Please check the file and try again.');
    }
  };

  // Add new team
  const addNewTeam = async () => {
    const normalizedNewTeam = normalizeName(newTeamName);
    const teamExists = allTeams.some(team => team.toLowerCase() === normalizedNewTeam.toLowerCase());
    if (!normalizedNewTeam || teamExists) return;
    
    const updatedTeams = sanitizeCustomTeams([...customTeams, normalizedNewTeam]);
    setCustomTeams(updatedTeams);
    await window.storage.set('custom-teams', JSON.stringify(updatedTeams));
    setNewTaskForm({ ...newTaskForm, team: normalizedNewTeam });
    setNewTeamName('');
    setShowNewTeamInput(false);
  };

  // Add new subdivision
  const addNewSubdivision = async () => {
    if (!newSubdivisionName.trim() || allSubdivisions.includes(newSubdivisionName.trim())) return;
    
    const updatedSubs = [...customSubdivisions, newSubdivisionName.trim()];
    setCustomSubdivisions(updatedSubs);
    await window.storage.set('custom-subdivisions', JSON.stringify(updatedSubs));
    setNewTaskForm({ ...newTaskForm, subdivision: newSubdivisionName.trim() });
    setNewSubdivisionName('');
    setShowNewSubdivisionInput(false);
  };

  // Add new project type
  const addNewProjectType = async () => {
    if (!newProjectTypeName.trim() || allProjectTypes.includes(newProjectTypeName.trim())) return;
    
    const updatedTypes = [...customProjectTypes, newProjectTypeName.trim()];
    setCustomProjectTypes(updatedTypes);
    await window.storage.set('custom-project-types', JSON.stringify(updatedTypes));
    setNewProjectForm({ ...newProjectForm, projectType: newProjectTypeName.trim() });
    setNewProjectTypeName('');
    setShowNewProjectTypeInput(false);
  };

  // Add new task to master checklist
  const addMasterTask = async () => {
    if (!newTaskForm.task.trim()) return;

    try {
      const newTask = {
        id: Date.now().toString(),
        task: newTaskForm.task,
        team: newTaskForm.team,
        subdivision: newTaskForm.subdivision,
        notes: newTaskForm.notes,
        subtasks: [],
        createdAt: new Date().toISOString()
      };

      const updatedTasks = [...masterTasks, newTask];
      setMasterTasks(updatedTasks);

      // Add this task to all existing projects
      const updatedProjects = projects.map(project => ({
        ...project,
        tasks: [
          ...project.tasks,
          { ...newTask, completed: false, projectId: project.id }
        ]
      }));
      
      setProjects(updatedProjects);
      
      // Clear ALL form fields immediately for responsive UI
      setNewTaskForm({ task: '', team: '', subdivision: '', notes: '' });
      
      // Save to storage in background
      await window.storage.set('master-tasks', JSON.stringify(updatedTasks));
      await saveProjects(updatedProjects);
    } catch (error) {
      console.error('Error adding master task:', error);
    }
  };

  // Edit existing task
  const updateMasterTask = async () => {
    if (!editingTask) {
      setEditingTask(null);
      return;
    }
    
    if (!editingTask.task || !editingTask.task.trim()) {
      alert('Task name is required');
      return;
    }

    try {
      const updatedTasks = masterTasks.map(t => 
        t.id === editingTask.id ? editingTask : t
      );
      setMasterTasks(updatedTasks);
      await window.storage.set('master-tasks', JSON.stringify(updatedTasks));

      // Update in all projects
      const updatedProjects = projects.map(project => ({
        ...project,
        tasks: project.tasks.map(t => 
          t.id === editingTask.id 
            ? { ...editingTask, completed: t.completed, projectId: t.projectId }
            : t
        )
      }));
      
      setProjects(updatedProjects);
      await saveProjects(updatedProjects);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setEditingTask(null);
    }
  };

  // Import tasks from CSV
  const importTasksFromCSV = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImportingCSV(true);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        alert('CSV file is empty or invalid');
        setImportingCSV(false);
        return;
      }

      // Parse header
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      // Validate headers
      const requiredHeaders = ['title', 'team', 'subdivision', 'notes', 'subtasks'];
      const hasAllHeaders = requiredHeaders.every(h => headers.includes(h));
      
      if (!hasAllHeaders) {
        alert(`CSV must have these columns: ${requiredHeaders.join(', ')}`);
        setImportingCSV(false);
        return;
      }

      const newTasks = [];
      
      // Parse each row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line.trim()) continue;

        // Parse CSV line (handle quoted fields with commas)
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let char of line) {
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        values.push(current.trim()); // Push last value

        // Map values to object
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index]?.replace(/^"|"$/g, '') || '';
        });

        // Parse subtasks (pipe-separated)
        const subtasksArray = row.subtasks 
          ? row.subtasks.split('|').map(st => st.trim()).filter(st => st)
          : [];

        const newTask = {
          id: Date.now().toString() + '-' + i,
          task: row.title || '',
          team: row.team || '',
          subdivision: row.subdivision || '',
          notes: row.notes || '',
          subtasks: subtasksArray.map((subtaskText, idx) => ({
            id: Date.now().toString() + '-' + i + '-' + idx,
            text: subtaskText,
            completed: false
          })),
          createdAt: new Date().toISOString()
        };

        if (newTask.task.trim()) {
          newTasks.push(newTask);
        }
      }

      if (newTasks.length === 0) {
        alert('No valid tasks found in CSV');
        setImportingCSV(false);
        return;
      }

      // Add to master tasks
      const updatedTasks = [...masterTasks, ...newTasks];
      setMasterTasks(updatedTasks);

      // Add to all existing projects
      const updatedProjects = projects.map(project => ({
        ...project,
        tasks: [
          ...project.tasks,
          ...newTasks.map(task => ({ ...task, completed: false, projectId: project.id }))
        ]
      }));
      
      setProjects(updatedProjects);
      
      // Save to storage
      await window.storage.set('master-tasks', JSON.stringify(updatedTasks));
      await saveProjects(updatedProjects);

      alert(`Successfully imported ${newTasks.length} tasks!`);
    } catch (error) {
      console.error('Error importing CSV:', error);
      alert('Error importing CSV file. Please check the format and try again.');
    } finally {
      setImportingCSV(false);
      event.target.value = ''; // Reset file input
    }
  };

  // Delete task from master
  const deleteMasterTask = async (taskId) => {
    const updatedTasks = masterTasks.filter(t => t.id !== taskId);
    setMasterTasks(updatedTasks);
    await window.storage.set('master-tasks', JSON.stringify(updatedTasks));

    // Remove from all projects
    const updatedProjects = projects.map(project => ({
      ...project,
      tasks: project.tasks.filter(t => t.id !== taskId)
    }));
    
    setProjects(updatedProjects);
    saveProjectsDebounced(updatedProjects);
  };

  // Create new project
  const createProject = async () => {
    console.log('🆕 Creating new project...');
    
    if (!newProjectForm.name.trim()) {
      console.log('⚠️ Project name is empty, aborting');
      return;
    }

    console.log(`📝 Project name: "${newProjectForm.name}"`);
    console.log(`📊 Current projects count: ${projects.length}`);

    // Default schedule items
    const defaultScheduleItems = [
      { id: `${Date.now()}-1`, name: 'Funding Approval', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-2`, name: 'Design Start', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-3`, name: 'Construction Start', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-4`, name: 'Substantial Completion', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-5`, name: 'Handover', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-6`, name: 'Go Live', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      // Post-Handover items (target dates only)
      { id: `${Date.now()}-7`, name: 'Site Survey', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-8`, name: 'Design Development', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-9`, name: 'LOB Awareness', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-10`, name: 'Issue for Permit', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-11`, name: 'Permit Process', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-12`, name: 'MER Freeze #1', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-13`, name: 'MER Freeze #2', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-14`, name: 'MER Handover to GTI', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-15`, name: 'MER Shell Ready', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-16`, name: 'MER Room Ready', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-17`, name: 'MER Pro. Ready', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-18`, name: 'Furniture Install', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-19`, name: 'Desktop Install', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() },
      { id: `${Date.now()}-20`, name: 'Equipment Delivery', approvedStartDate: '', approvedEndDate: '', targetStartDate: '', targetEndDate: '', createdAt: new Date().toISOString() }
    ];

    // Default bid schedule phases
    const defaultBidSchedule = [
      { id: `bid-${Date.now()}-0`, phase: 'Bid Publish Date', date: '', notes: '', createdAt: new Date().toISOString() },
      { id: `bid-${Date.now()}-1`, phase: 'Pre-Bid Walk', date: '', notes: '', createdAt: new Date().toISOString() },
      { id: `bid-${Date.now()}-2`, phase: 'RFI', date: '', notes: '', createdAt: new Date().toISOString() },
      { id: `bid-${Date.now()}-3`, phase: 'RFI Responses Issued', date: '', notes: '', createdAt: new Date().toISOString() },
      { id: `bid-${Date.now()}-4`, phase: 'Proposal Due', date: '', notes: '', createdAt: new Date().toISOString() },
      { id: `bid-${Date.now()}-5`, phase: 'Leveling/Interview', date: '', notes: '', createdAt: new Date().toISOString() },
      { id: `bid-${Date.now()}-6`, phase: 'Best and Final', date: '', notes: '', createdAt: new Date().toISOString() }
    ];

    const newProjectId = Date.now().toString();
    const newProject = {
      id: newProjectId,
      name: newProjectForm.name,
      projectType: newProjectForm.projectType,
      address: newProjectForm.address,
      sqft: newProjectForm.sqft,
      approvedBudget: newProjectForm.approvedBudget,
      leaseExpiration: newProjectForm.leaseExpiration,
      logo: newProjectForm.logo,
      status: 'active',
      latitude: null,
      longitude: null,
      createdAt: new Date().toISOString(),
      schedule: defaultScheduleItems,
      budget: [],
      costSavings: [],
      submittals: [],
      rfis: [],
      changeOrders: [],
      permitComments: [],
      bidSchedule: defaultBidSchedule,
      meetingNotes: [],
      floorPlans: [],
      tasks: masterTasks.map(task => ({
        ...task,
        completed: false,
        projectId: newProjectId
      }))
    };

    console.log('📦 New project object created:', { 
      id: newProject.id, 
      name: newProject.name,
      tasksCount: newProject.tasks.length
    });

    const updatedProjects = [...projects, newProject];
    
    console.log('📊 Updated projects array:', {
      oldCount: projects.length,
      newCount: updatedProjects.length,
      projectIds: updatedProjects.map(p => p.id)
    });

    // CRITICAL: Save to storage BEFORE updating state
    console.log('💾 Saving to Supabase...');
    try {
      const saveResult = await saveProjects(updatedProjects);
      console.log('✅ Save result:', saveResult);
      
      if (!saveResult) {
        console.error('❌ Save failed - no result returned');
        alert('Failed to save project. Please try again.');
        return;
      }
      
      console.log(`✅ Successfully saved ${updatedProjects.length} projects to Supabase`);
      
      // VERIFICATION: Check if data actually made it to database
      console.log('🔍 Verifying save to database...');
      const verifyResult = await window.storage.get('projects');
      if (verifyResult) {
        const savedProjects = JSON.parse(verifyResult.value);
        console.log(`✅ Verification: Found ${savedProjects.length} projects in database`);
        
        if (savedProjects.length !== updatedProjects.length) {
          console.error(`⚠️ WARNING: Saved ${updatedProjects.length} but only found ${savedProjects.length} in database!`);
          alert(`Warning: Project count mismatch. Expected ${updatedProjects.length} but found ${savedProjects.length}`);
        }
      } else {
        console.error('❌ Verification failed - no projects found in database!');
        alert('Warning: Could not verify project was saved. Please refresh and check.');
      }
    } catch (error) {
      console.error('❌ Error saving to Supabase:', error);
      alert('Error saving project: ' + error.message);
      return;
    }
    
    console.log('✅ Save successful, now updating UI...');
    
    // Update state and close form AFTER successful save
    setNewProjectForm({ name: '', projectType: 'Standard', address: '', sqft: '', approvedBudget: '', leaseExpiration: '', logo: '' });
    
    // Reset expanded tasks state so all tasks start collapsed
    setExpandedProjectTasks({});
    
    setView('projects');
    
    console.log('✅ Project creation complete');
  };

  // Toggle task completion in a project
  const toggleTaskCompletion = async (projectId, taskId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    
    // Update selectedProject if it's the one being modified
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    await saveProjects(updatedProjects);
  };

  // Add sub-task to a master task
  const addSubTaskToMaster = async (taskId, subTaskText) => {
    if (!subTaskText.trim()) return;

    const subTask = {
      id: Date.now().toString(),
      text: subTaskText.trim(),
      completed: false
    };

    const updatedTasks = masterTasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [...(task.subtasks || []), subTask]
        };
      }
      return task;
    });

    setMasterTasks(updatedTasks);
    
    // Clear the input field immediately for responsive UI
    setNewSubTask(prev => ({ ...prev, [taskId]: '' }));

    // Update in all projects
    const updatedProjects = projects.map(project => ({
      ...project,
      tasks: project.tasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            subtasks: [...(t.subtasks || []), subTask]
          };
        }
        return t;
      })
    }));
    
    setProjects(updatedProjects);
    
    // Save to storage in background
    await window.storage.set('master-tasks', JSON.stringify(updatedTasks));
    await saveProjects(updatedProjects);
  };

  // Toggle sub-task completion in master
  const toggleSubTaskInMaster = async (taskId, subTaskId) => {
    const updatedTasks = masterTasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: (task.subtasks || []).map(st =>
            st.id === subTaskId ? { ...st, completed: !st.completed } : st
          )
        };
      }
      return task;
    });

    setMasterTasks(updatedTasks);
    await window.storage.set('master-tasks', JSON.stringify(updatedTasks));

    // Update in all projects
    const updatedProjects = projects.map(project => ({
      ...project,
      tasks: project.tasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            subtasks: (t.subtasks || []).map(st =>
              st.id === subTaskId ? { ...st, completed: !st.completed } : st
            )
          };
        }
        return t;
      })
    }));
    
    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
  };

  // Delete sub-task from master
  const deleteSubTaskFromMaster = async (taskId, subTaskId) => {
    const updatedTasks = masterTasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: (task.subtasks || []).filter(st => st.id !== subTaskId)
        };
      }
      return task;
    });

    setMasterTasks(updatedTasks);
    await window.storage.set('master-tasks', JSON.stringify(updatedTasks));

    // Update in all projects
    const updatedProjects = projects.map(project => ({
      ...project,
      tasks: project.tasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            subtasks: (t.subtasks || []).filter(st => st.id !== subTaskId)
          };
        }
        return t;
      })
    }));
    
    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
  };

  // Archive project (soft delete)
  const deleteProject = async (projectId) => {
    // Close the confirmation modal immediately
    setProjectToDelete(null);

    const updatedProjects = projects.map(project =>
      project.id === projectId ? { ...project, status: 'archived' } : project
    );
    setProjects(updatedProjects);

    if (selectedProject?.id === projectId) {
      setSelectedProject({ ...selectedProject, status: 'archived' });
      setView('projects');
    }

    await saveProjects(updatedProjects);
  };

  // Save edited project from modal
  const saveEditedProject = async () => {
    console.log('saveEditedProject called with:', editingProject);
    
    if (!editingProject) {
      alert('No project to save!');
      return;
    }
    
    try {
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id ? editingProject : p
      );
      
      console.log('Updated projects:', updatedProjects);
      
      setProjects(updatedProjects);
      
      // Update selectedProject if it's the one being edited
      if (selectedProject?.id === editingProject.id) {
        setSelectedProject(editingProject);
      }
      
      // Try storage save
      try {
        await saveProjects(updatedProjects);
        console.log('Project saved to storage successfully');
      } catch (storageError) {
        console.error('Storage save failed:', storageError);
        alert('Warning: Could not save to storage, but changes are in memory');
      }
      
      setShowEditModal(false);
      setEditingProject(null);
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error: ' + error.message);
    }
  };

  // Confirm delete project
  const confirmDeleteProject = (projectId) => {
    setProjectToDelete(projectId);
  };

  // Cancel delete project
  const cancelDeleteProject = () => {
    setProjectToDelete(null);
  };

  // Confirm delete for various items
  const confirmDelete = (type, id, projectId, name = '') => {
    setItemToDelete({ type, id, projectId, name });
  };

  // Cancel delete for items
  const cancelDelete = () => {
    setItemToDelete(null);
  };

  // Execute delete based on type
  const executeDelete = async () => {
    if (!itemToDelete) return;

    const { type, id, projectId } = itemToDelete;
    
    // Close modal immediately
    setItemToDelete(null);

    try {
      // Perform the deletion and wait for it to complete
      switch (type) {
        case 'master-task':
          await deleteMasterTask(id);
          break;
        case 'master-subtask':
          await deleteSubTaskFromMaster(projectId, id);
          break;
        case 'schedule':
          await deleteScheduleItem(projectId, id);
          break;
        case 'budget':
          await deleteBudgetItem(projectId, id);
          break;
        case 'costsaving':
          await deleteCostSaving(projectId, id);
          break;
        case 'submittal':
          await deleteSubmittal(projectId, id);
          break;
        case 'rfi':
          await deleteRFI(projectId, id);
          break;
        case 'changeorder':
          await deleteChangeOrder(projectId, id);
          break;
        case 'permit':
          await deletePermitComment(projectId, id);
          break;
        case 'contact':
          await deleteContact(id);
          break;
        case 'bid':
          await deleteBidItem(projectId, id);
          break;
        case 'meetingnote':
          await deleteMeetingNote(projectId, id);
          break;
        case 'floor-plan':
          await deleteFloorPlan(projectId, id);
          break;
        default:
          break;
      }
      
      // After successful deletion, clear all editing states to force UI refresh
      setEditingBudgetItem(null);
      setEditingSubmittal(null);
      setEditingRFI(null);
      setEditingChangeOrder(null);
      setEditingPermitComment(null);
      setEditingBidItem(null);
      setEditingScheduleItem(null);
      setEditingMeetingNote(null);
      
      console.log('Delete completed successfully');
    } catch (error) {
      console.error('Error during delete:', error);
      alert('Error deleting item: ' + error.message);
    }
  };

  // Sync master tasks to all projects (force refresh)
  const syncAllProjects = async (silent = false) => {
    const updatedProjects = projects.map(project => {
      // Get current completion status
      const completionMap = {};
      project.tasks.forEach(task => {
        completionMap[task.id] = task.completed;
      });

      // Update with master tasks, preserving completion status
      return {
        ...project,
        tasks: masterTasks.map(masterTask => ({
          ...masterTask,
          completed: completionMap[masterTask.id] || false,
          projectId: project.id
        })),
        schedule: project.schedule || [] // Preserve schedule
      };
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    // Only show alert if not silent mode
    if (!silent) {
      alert('All projects synced with master checklist!');
    }
  };

  // Add schedule item to project
  const addScheduleItem = async (projectId) => {
    if (!newScheduleItem.name.trim() || !newScheduleItem.startDate || !newScheduleItem.endDate) return;

    const scheduleItem = {
      id: Date.now().toString(),
      name: newScheduleItem.name,
      startDate: newScheduleItem.startDate,
      endDate: newScheduleItem.endDate,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          schedule: [...(project.schedule || []), scheduleItem]
        };
      }
      return project;
    });

    // Update state immediately
    setProjects(updatedProjects);
    setNewScheduleItem({ name: '', startDate: '', endDate: '' });
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    // Save to storage after UI update
    await saveProjects(updatedProjects);
  };

  // Update schedule item
  const updateScheduleItem = async (projectId) => {
    if (!editingScheduleItem || !editingScheduleItem.name.trim()) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          schedule: project.schedule.map(item =>
            item.id === editingScheduleItem.id ? editingScheduleItem : item
          )
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    
    // Update selectedProject if it's the one being modified
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    setEditingScheduleItem(null);
    
    // Save to storage
    await saveProjects(updatedProjects);
  };

  // Delete schedule item
  const deleteScheduleItem = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          schedule: project.schedule.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    // Update selectedProject if it's the one being modified
    if (selectedProject?.id === projectId) {
      const updated = updatedProjects.find(p => p.id === projectId);
      if (updated) {
        setSelectedProject(updated);
      }
    }
  };

  // Toggle schedule item completion
  const toggleScheduleItemCompletion = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          schedule: project.schedule.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    // Collapse the item after marking complete
    setExpandedScheduleItems(prev => ({ ...prev, [itemId]: false }));
    
    await saveProjects(updatedProjects);
  };

  // Add budget item to project
  const addBudgetItem = async (projectId) => {
    if (!newBudgetItem.category.trim() || (!newBudgetItem.baselineCost && !newBudgetItem.targetCost)) return;

    const budgetItem = {
      id: Date.now().toString(),
      category: newBudgetItem.category,
      baselineCost: newBudgetItem.baselineCost || '0',
      targetCost: newBudgetItem.targetCost || '0',
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          budget: [...(project.budget || []), budgetItem]
        };
      }
      return project;
    });

    // Update state immediately
    setProjects(updatedProjects);
    setNewBudgetItem({ category: '', baselineCost: '', targetCost: '' });
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    // Save to storage after UI update
    await saveProjects(updatedProjects);
  };

  // Update budget item
  const updateBudgetItem = async (projectId) => {
    if (!editingBudgetItem || !editingBudgetItem.category.trim()) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          budget: project.budget.map(item =>
            item.id === editingBudgetItem.id ? editingBudgetItem : item
          )
        };
      }
      return project;
    });

    // Update state immediately
    setProjects(updatedProjects);
    setEditingBudgetItem(null);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    // Save to storage after UI update
    await saveProjects(updatedProjects);
  };

  // Delete budget item
  const deleteBudgetItem = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          budget: project.budget.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
  };

  // Calculate total budget
  const getTotalBudget = (project) => {
    if (!project.budget || project.budget.length === 0) return 0;
    return project.budget.reduce((total, item) => {
      // Support both old (amount) and new (targetCost) format
      const amount = parseFloat(item.targetCost || item.amount) || 0;
      return total + amount;
    }, 0);
  };

  const getBaselineBudget = (project) => {
    if (!project.budget || project.budget.length === 0) return 0;
    return project.budget.reduce((total, item) => {
      const baseline = parseFloat(item.baselineCost || item.amount || 0);
      return total + baseline;
    }, 0);
  };

  const getTargetBudget = (project) => {
    if (!project.budget || project.budget.length === 0) return 0;
    return project.budget.reduce((total, item) => {
      const target = parseFloat(item.targetCost || item.amount || 0);
      return total + target;
    }, 0);
  };

  // Cost Savings Management Functions
  const addCostSaving = async (projectId) => {
    if (!newCostSaving.description.trim() || !newCostSaving.amount) return;

    const project = projects.find(p => p.id === projectId);
    const currentCostSavings = project.costSavings || [];
    const nextNumber = String(currentCostSavings.length + 1).padStart(3, '0');

    const costSaving = {
      id: Date.now().toString(),
      number: nextNumber,
      description: newCostSaving.description,
      amount: newCostSaving.amount,
      notes: newCostSaving.notes,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          costSavings: [...(project.costSavings || []), costSaving]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setNewCostSaving({ description: '', amount: '', notes: '' });
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    await saveProjects(updatedProjects);
  };

  const updateCostSaving = async (projectId) => {
    if (!editingCostSaving || !editingCostSaving.description.trim()) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          costSavings: project.costSavings.map(item =>
            item.id === editingCostSaving.id ? editingCostSaving : item
          )
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    setEditingCostSaving(null);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  const deleteCostSaving = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          costSavings: project.costSavings.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    setItemToDelete(null);
  };

  const getTotalCostSavings = (project) => {
    if (!project.costSavings || project.costSavings.length === 0) return 0;
    return project.costSavings.reduce((total, item) => {
      const amount = parseFloat(item.amount) || 0;
      return total + amount;
    }, 0);
  };

  // Update project details (name, budget, type)
  const updateProjectDetails = async () => {
    if (!editedProject || !editedProject.name.trim()) return;

    const updatedProjects = projects.map(project => 
      project.id === editedProject.id ? editedProject : project
    );

    setProjects(updatedProjects);
    setSelectedProject(editedProject);
    setEditingProjectDetails(false);
    setEditedProject(null);
    
    // Save to storage after state updates
    await saveProjects(updatedProjects);
  };

  // Update project status
  const updateProjectStatus = async (projectId, newStatus) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId ? { ...project, status: newStatus } : project
    );

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    // Update selected project if it's the one being changed
    if (selectedProject?.id === projectId) {
      setSelectedProject({ ...selectedProject, status: newStatus });
    }
  };

  // Filter tasks
  const getFilteredTasks = (tasks, showCompleted = false) => {
    return tasks.filter(task => {
      const matchesSearch = task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTeam = filterTeam === 'all' || task.team === filterTeam;
      const matchesSubdivision = filterSubdivision === 'all' || task.subdivision === filterSubdivision;
      const matchesCompletion = showCompleted ? task.completed : !task.completed;
      return matchesSearch && matchesTeam && matchesSubdivision && matchesCompletion;
    });
  };

  // Calculate project progress
  const getProjectProgress = (project) => {
    if (!project.tasks.length) return 0;
    const completed = project.tasks.filter(t => t.completed).length;
    return Math.round((completed / project.tasks.length) * 100);
  };

  // Get construction start date from schedule
  const getConstructionStartDate = (project) => {
    const schedule = project.schedule || [];
    const constructionItem = schedule.find(item => 
      item.name.toLowerCase().includes('construction') && 
      item.name.toLowerCase().includes('start')
    );
    return constructionItem?.startDate || null;
  };

  // Get handover date from schedule
  const getHandoverDate = (project) => {
    const schedule = project.schedule || [];
    const handoverItem = schedule.find(item => 
      item.name.toLowerCase().includes('handover') ||
      item.name.toLowerCase().includes('hand over') ||
      item.name.toLowerCase().includes('completion')
    );
    return handoverItem?.endDate || null;
  };

  // Add submittal to project
  const addSubmittal = async (projectId) => {
    if (!newSubmittal.type || !newSubmittal.description.trim()) return;

    const project = projects.find(p => p.id === projectId);
    const currentSubmittals = project.submittals || [];
    const nextNumber = String(currentSubmittals.length + 1).padStart(3, '0');

    const submittal = {
      id: Date.now().toString(),
      number: nextNumber,
      type: newSubmittal.type,
      description: newSubmittal.description,
      notes: newSubmittal.notes,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          submittals: [...(project.submittals || []), submittal]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setNewSubmittal({ type: '', description: '', notes: '' });
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    await saveProjects(updatedProjects);
  };

  // Update submittal
  const updateSubmittal = async (projectId) => {
    if (!editingSubmittal || !editingSubmittal.description.trim()) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          submittals: project.submittals.map(item =>
            item.id === editingSubmittal.id ? editingSubmittal : item
          )
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    setEditingSubmittal(null);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Delete submittal
  const deleteSubmittal = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          submittals: project.submittals.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Add RFI to project
  const addRFI = async (projectId) => {
    if (!newRFI.description.trim() || !newRFI.responsibleTeam) return;

    const project = projects.find(p => p.id === projectId);
    const currentRFIs = project.rfis || [];
    const nextNumber = String(currentRFIs.length + 1).padStart(2, '0');

    const rfi = {
      id: Date.now().toString(),
      number: nextNumber,
      description: newRFI.description,
      responsibleTeam: newRFI.responsibleTeam,
      notes: newRFI.notes,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          rfis: [...(project.rfis || []), rfi]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setNewRFI({ description: '', responsibleTeam: '', notes: '' });
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    await saveProjects(updatedProjects);
  };

  // Update RFI
  const updateRFI = async (projectId) => {
    if (!editingRFI || !editingRFI.description.trim()) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          rfis: project.rfis.map(item =>
            item.id === editingRFI.id ? editingRFI : item
          )
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    setEditingRFI(null);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Delete RFI
  const deleteRFI = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          rfis: project.rfis.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Add Change Order to project
  const addChangeOrder = async (projectId) => {
    if (!newChangeOrder.description.trim() || !newChangeOrder.amount || !newChangeOrder.requestedBy) return;

    const project = projects.find(p => p.id === projectId);
    const currentChangeOrders = project.changeOrders || [];
    const nextNumber = currentChangeOrders.length + 1;

    const changeOrder = {
      id: Date.now().toString(),
      number: `CO#${nextNumber}`,
      description: newChangeOrder.description,
      amount: newChangeOrder.amount,
      notes: newChangeOrder.notes,
      requestedBy: newChangeOrder.requestedBy,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          changeOrders: [...(project.changeOrders || []), changeOrder]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setNewChangeOrder({ description: '', amount: '', notes: '', requestedBy: '' });
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    await saveProjects(updatedProjects);
  };

  // Update Change Order
  const updateChangeOrder = async (projectId) => {
    if (!editingChangeOrder || !editingChangeOrder.description.trim()) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          changeOrders: project.changeOrders.map(item =>
            item.id === editingChangeOrder.id ? editingChangeOrder : item
          )
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    setEditingChangeOrder(null);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Delete Change Order
  const deleteChangeOrder = async (projectId, itemId) => {
    console.log('deleteChangeOrder called:', { projectId, itemId });
    console.log('Current selectedProject:', selectedProject);
    
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          changeOrders: project.changeOrders.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    console.log('Updated projects:', updatedProjects);
    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      console.log('Updating selectedProject to:', updatedSelectedProject);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Calculate total change orders
  const getTotalChangeOrders = (project) => {
    if (!project.changeOrders || project.changeOrders.length === 0) return 0;
    return project.changeOrders.reduce((total, item) => {
      const amount = parseFloat(item.amount) || 0;
      return total + amount;
    }, 0);
  };

  // Dashboard Helper Functions
  const getProjectHealthStatus = (project) => {
    const totalBudget = getTotalBudget(project);
    const changeOrders = getTotalChangeOrders(project);
    const combinedBudget = totalBudget + changeOrders;
    const approvedBudget = parseFloat(project.approvedBudget || 0);
    
    // Check budget health
    const isOverBudget = approvedBudget > 0 && combinedBudget > approvedBudget;
    const budgetUsage = approvedBudget > 0 ? (combinedBudget / approvedBudget) * 100 : 0;
    
    // Check schedule health (upcoming milestones in next 7 days)
    const upcomingMilestones = (project.schedule || []).filter(item => {
      if (!item.startDate) return false;
      const daysUntil = Math.ceil((new Date(item.startDate) - new Date()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 7;
    });
    
    // Determine status
    if (isOverBudget) {
      return { status: 'risk', color: 'red', label: 'Over Budget', icon: '🔴', priority: 1 };
    } else if (budgetUsage >= 80 || upcomingMilestones.length > 0) {
      return { status: 'warning', color: 'yellow', label: 'At Risk', icon: '⚠️', priority: 2 };
    } else {
      return { status: 'good', color: 'green', label: 'On Track', icon: '✅', priority: 3 };
    }
  };

  const getPortfolioStats = () => {
    const activeProjects = projects.filter(p => (p.status || 'active') === 'active');
    
    return {
      totalProjects: activeProjects.length,
      totalSQFT: activeProjects.reduce((sum, p) => sum + (parseInt(p.sqft?.replace(/,/g, '') || 0)), 0),
      avgSQFT: activeProjects.length > 0 
        ? Math.round(activeProjects.reduce((sum, p) => sum + (parseInt(p.sqft?.replace(/,/g, '') || 0)), 0) / activeProjects.length)
        : 0,
      totalApprovedBudget: activeProjects.reduce((sum, p) => sum + parseFloat(p.approvedBudget || 0), 0),
      totalActualBudget: activeProjects.reduce((sum, p) => sum + getTotalBudget(p) + getTotalChangeOrders(p), 0),
      totalChangeOrders: activeProjects.reduce((sum, p) => sum + getTotalChangeOrders(p), 0),
      avgCompletion: activeProjects.length > 0
        ? Math.round(activeProjects.reduce((sum, p) => sum + getProjectProgress(p), 0) / activeProjects.length)
        : 0,
      projectTypes: activeProjects.reduce((acc, p) => {
        const type = p.projectType || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {}),
      atRiskCount: activeProjects.filter(p => {
        const health = getProjectHealthStatus(p);
        return health.status === 'risk' || health.status === 'warning';
      }).length
    };
  };

  const getUpcomingMilestones = () => {
    const allMilestones = [];
    
    projects.forEach(project => {
      if ((project.status || 'active') !== 'active') return;
      
      // Add construction schedule milestones
      (project.schedule || []).forEach(item => {
        // Use target END date if available, otherwise fall back to approved END date, then regular endDate
        // Dashboard shows when milestones END, not when they start
        const milestoneDate = item.targetEndDate || item.approvedEndDate || item.endDate;
        if (!milestoneDate) return;
        
        const daysUntil = Math.ceil((new Date(milestoneDate) - new Date()) / (1000 * 60 * 60 * 24));
        
        // Only show milestones in next 30 days
        if (daysUntil >= 0 && daysUntil <= 30) {
          allMilestones.push({
            projectId: project.id,
            projectName: project.name,
            milestoneName: item.name,
            date: milestoneDate,
            daysUntil: daysUntil,
            urgency: daysUntil <= 7 ? 'high' : daysUntil <= 14 ? 'medium' : 'low'
          });
        }
      });

      // Add bid schedule dates
      (project.bidSchedule || []).forEach(item => {
        if (!item.date) return;
        
        const daysUntil = Math.ceil((parseLocalDate(item.date) - new Date()) / (1000 * 60 * 60 * 24));
        
        // Only show bid dates in next 30 days
        if (daysUntil >= 0 && daysUntil <= 30) {
          allMilestones.push({
            projectId: project.id,
            projectName: project.name,
            milestoneName: `📋 ${item.phase}`, // Add emoji to distinguish bid items
            date: item.date,
            daysUntil: daysUntil,
            urgency: daysUntil <= 7 ? 'high' : daysUntil <= 14 ? 'medium' : 'low'
          });
        }
      });
    });
    
    // Sort by date (soonest first)
    return allMilestones.sort((a, b) => a.daysUntil - b.daysUntil).slice(0, 7);
  };

  // Add Permit Comment to project
  const addPermitComment = async (projectId) => {
    if (!newPermitComment.description.trim() || !newPermitComment.commentType) return;

    const project = projects.find(p => p.id === projectId);
    const currentPermitComments = project.permitComments || [];
    const nextNumber = String(currentPermitComments.length + 1).padStart(3, '0');

    const permitComment = {
      id: Date.now().toString(),
      number: nextNumber,
      description: newPermitComment.description,
      commentType: newPermitComment.commentType,
      notes: newPermitComment.notes,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          permitComments: [...(project.permitComments || []), permitComment]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setNewPermitComment({ description: '', commentType: '', notes: '' });
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    await saveProjects(updatedProjects);
  };

  // Update Permit Comment
  const updatePermitComment = async (projectId) => {
    if (!editingPermitComment || !editingPermitComment.description.trim()) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          permitComments: project.permitComments.map(item =>
            item.id === editingPermitComment.id ? editingPermitComment : item
          )
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    setEditingPermitComment(null);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Delete Permit Comment
  const deletePermitComment = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          permitComments: project.permitComments.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Analytics & Scorecard Functions
  const calculateSchedulePerformance = (project) => {
    const scheduleItems = project.schedule || [];
    if (scheduleItems.length === 0) return { spi: 1.0, variance: 0, status: 'good' };
    
    const today = new Date();
    let totalPlanned = 0;
    let totalActual = 0;
    
    scheduleItems.forEach(item => {
      const endDate = new Date(item.targetEndDate || item.approvedEndDate || item.endDate);
      if (endDate < today) {
        totalPlanned++;
        // Check if task is completed (you can enhance this logic)
        const tasks = (project.tasks || []).filter(t => t.phase === item.name);
        if (tasks.length > 0 && tasks.every(t => t.completed)) {
          totalActual++;
        }
      }
    });
    
    const spi = totalPlanned > 0 ? totalActual / totalPlanned : 1.0;
    const variance = totalActual - totalPlanned;
    const status = spi >= 0.9 ? 'good' : spi >= 0.75 ? 'warning' : 'risk';
    
    return { spi: Math.round(spi * 100) / 100, variance, status };
  };

  const calculateCostPerformance = (project) => {
    const approved = parseFloat(project.approvedBudget || 0);
    const actual = getTotalBudget(project) + getTotalChangeOrders(project);
    
    if (approved === 0) return { cpi: 1.0, variance: 0, percentUsed: 0, status: 'good' };
    
    const cpi = approved / actual;
    const variance = approved - actual;
    const percentUsed = Math.round((actual / approved) * 100);
    const status = percentUsed <= 100 ? 'good' : percentUsed <= 110 ? 'warning' : 'risk';
    
    return { 
      cpi: Math.round(cpi * 100) / 100, 
      variance: Math.round(variance), 
      percentUsed,
      status 
    };
  };

  const calculateQualityMetrics = (project) => {
    const submittals = project.submittals || [];
    const rfis = project.rfis || [];
    const changeOrders = project.changeOrders || [];
    
    // Calculate RFI response time (average days between timestamp and response)
    const rfiResponseTimes = rfis.map(rfi => {
      const created = new Date(rfi.timestamp);
      const today = new Date();
      return Math.ceil((today - created) / (1000 * 60 * 60 * 24));
    });
    const avgRfiResponse = rfiResponseTimes.length > 0
      ? Math.round(rfiResponseTimes.reduce((a, b) => a + b, 0) / rfiResponseTimes.length)
      : 0;
    
    // Calculate change order percentage
    const approved = parseFloat(project.approvedBudget || 0);
    const coTotal = getTotalChangeOrders(project);
    const coPercentage = approved > 0 ? Math.round((coTotal / approved) * 100) : 0;
    
    // Overall quality score (0-100)
    let qualityScore = 100;
    if (avgRfiResponse > 5) qualityScore -= 15;
    if (coPercentage > 10) qualityScore -= 20;
    if (submittals.length > 5) qualityScore -= 10; // Many submittals may indicate issues
    
    qualityScore = Math.max(0, qualityScore);
    const status = qualityScore >= 80 ? 'good' : qualityScore >= 60 ? 'warning' : 'risk';
    
    return {
      score: qualityScore,
      avgRfiResponse,
      coPercentage,
      submittalCount: submittals.length,
      status
    };
  };

  const calculateProjectHealthScore = (project) => {
    const schedule = calculateSchedulePerformance(project);
    const cost = calculateCostPerformance(project);
    const quality = calculateQualityMetrics(project);
    const taskCompletion = getProjectProgress(project);
    
    // Weighted scoring: Schedule 25%, Cost 30%, Quality 25%, Tasks 20%
    const overallScore = Math.round(
      (schedule.spi * 0.25 * 100) +
      (cost.cpi * 0.30 * 100) +
      (quality.score * 0.25) +
      (taskCompletion * 0.20)
    );
    
    const status = overallScore >= 80 ? 'good' : overallScore >= 60 ? 'warning' : 'risk';
    
    return {
      overallScore: Math.min(100, overallScore),
      schedule,
      cost,
      quality,
      taskCompletion,
      status
    };
  };

  const calculatePMOScorecard = () => {
    const activeProjects = projects.filter(p => (p.status || 'active') === 'active');
    if (activeProjects.length === 0) {
      return {
        onTimeDelivery: 0,
        budgetAdherence: 0,
        scopeManagement: 0,
        qualityScore: 0,
        overallScore: 0
      };
    }
    
    // Calculate portfolio-wide metrics
    const onTimeCount = activeProjects.filter(p => {
      const sched = calculateSchedulePerformance(p);
      return sched.status === 'good';
    }).length;
    
    const budgetCount = activeProjects.filter(p => {
      const cost = calculateCostPerformance(p);
      return cost.status === 'good';
    }).length;
    
    const scopeCount = activeProjects.filter(p => {
      const quality = calculateQualityMetrics(p);
      return quality.coPercentage < 10;
    }).length;
    
    const avgQuality = Math.round(
      activeProjects.reduce((sum, p) => {
        const quality = calculateQualityMetrics(p);
        return sum + quality.score;
      }, 0) / activeProjects.length
    );
    
    const onTimeDelivery = Math.round((onTimeCount / activeProjects.length) * 100);
    const budgetAdherence = Math.round((budgetCount / activeProjects.length) * 100);
    const scopeManagement = Math.round((scopeCount / activeProjects.length) * 100);
    
    const overallScore = Math.round(
      (onTimeDelivery * 0.3) +
      (budgetAdherence * 0.3) +
      (scopeManagement * 0.2) +
      (avgQuality * 0.2)
    );
    
    return {
      onTimeDelivery,
      budgetAdherence,
      scopeManagement,
      qualityScore: avgQuality,
      overallScore,
      totalProjects: activeProjects.length
    };
  };

  // Map & Geocoding Functions
  const geocodeAddress = async (project) => {
    if (!project.address || project.address.trim() === '') {
      alert('❌ No address found for this project.\n\nPlease edit the project and add a complete address:\n"123 Main Street, City, State ZIP"');
      return;
    }

    // Check if address is too short
    if (project.address.length < 10) {
      alert('❌ Address is too short.\n\nPlease provide a more complete address:\n"123 Main Street, City, State ZIP"');
      return;
    }

    setGeocodingProject(project.id);
    
    try {
      // Normalize address - replace "Florida" with "FL", etc.
      let normalizedAddress = project.address
        .replace(/\bFlorida\b/gi, 'FL')
        .replace(/\bCalifornia\b/gi, 'CA')
        .replace(/\bTexas\b/gi, 'TX')
        .replace(/\bNew York\b/gi, 'NY')
        .replace(/\bGeorgia\b/gi, 'GA')
        .replace(/\bIllinois\b/gi, 'IL')
        .trim();

      console.log('Geocoding address:', normalizedAddress);
      
      // Try Method 1: Nominatim (OpenStreetMap)
      let data = [];
      try {
        const nominatimResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(normalizedAddress)}&limit=1&countrycodes=us`,
          {
            headers: {
              'User-Agent': 'CRE-Project-Manager/1.0'
            }
          }
        );
        
        if (nominatimResponse.ok) {
          data = await nominatimResponse.json();
          console.log('Nominatim response:', data);
        }
      } catch (nominatimError) {
        console.log('Nominatim failed, trying alternatives:', nominatimError);
      }
      
      // Try Method 2: Photon (if Nominatim fails)
      if (data.length === 0) {
        try {
          console.log('Trying Photon geocoder...');
          const photonResponse = await fetch(
            `https://photon.komoot.io/api/?q=${encodeURIComponent(normalizedAddress)}&limit=1`
          );
          
          if (photonResponse.ok) {
            const photonData = await photonResponse.json();
            console.log('Photon response:', photonData);
            
            if (photonData.features && photonData.features.length > 0) {
              const coords = photonData.features[0].geometry.coordinates;
              data = [{
                lat: coords[1],
                lon: coords[0],
                display_name: photonData.features[0].properties.name || normalizedAddress
              }];
            }
          }
        } catch (photonError) {
          console.log('Photon failed:', photonError);
        }
      }
      
      if (data.length > 0) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);
        
        console.log('Found coordinates:', latitude, longitude);
        
        // Update project with coordinates
        const updatedProjects = projects.map(p => 
          p.id === project.id 
            ? { ...p, latitude, longitude }
            : p
        );
        
        setProjects(updatedProjects);
        await saveProjects(updatedProjects);
        
        if (selectedProject?.id === project.id) {
          setSelectedProject({ ...selectedProject, latitude, longitude });
        }
        
        // If map is initialized, reinitialize to add new marker
        if (mapRef.current) {
          initializeMap(updatedProjects);
        }
        
        // Show success message
        alert(`✅ Successfully mapped!\n\n${project.name}\nLocation: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}\n\nFound: ${data[0].display_name || 'Location confirmed'}`);
      } else {
        // Show manual entry option
        const manualEntry = window.confirm(
          `❌ Could not automatically geocode:\n"${project.address}"\n\n` +
          `Would you like to enter coordinates manually?\n\n` +
          `Click OK to enter coordinates, or Cancel to try again later.\n\n` +
          `💡 You can find coordinates at:\nhttps://www.google.com/maps`
        );
        
        if (manualEntry) {
          const latInput = prompt('Enter Latitude (e.g., 26.1224):');
          if (latInput) {
            const lngInput = prompt('Enter Longitude (e.g., -80.1373):');
            if (lngInput) {
              const latitude = parseFloat(latInput);
              const longitude = parseFloat(lngInput);
              
              if (!isNaN(latitude) && !isNaN(longitude) && 
                  latitude >= -90 && latitude <= 90 && 
                  longitude >= -180 && longitude <= 180) {
                
                // Update project with manual coordinates
                const updatedProjects = projects.map(p => 
                  p.id === project.id 
                    ? { ...p, latitude, longitude }
                    : p
                );
                
                setProjects(updatedProjects);
                await saveProjects(updatedProjects);
                
                if (selectedProject?.id === project.id) {
                  setSelectedProject({ ...selectedProject, latitude, longitude });
                }
                
                if (mapRef.current) {
                  initializeMap(updatedProjects);
                }
                
                alert(`✅ Coordinates saved!\n\n${project.name}\nLocation: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
              } else {
                alert('❌ Invalid coordinates. Please try again.');
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      alert(`❌ Error geocoding address.\n\n${error.message}\n\nPlease check your internet connection and try again.`);
    } finally {
      setGeocodingProject(null);
    }
  };

  const getMarkerColor = (status) => {
    switch(status) {
      case 'active': return '#22c55e'; // green
      case 'completed': return '#3b82f6'; // blue  
      case 'on-hold': return '#f59e0b'; // amber
      default: return '#6b7280'; // gray
    }
  };

  const initializeMap = (projectsData) => {
    // This function will be called from useEffect
    if (typeof window === 'undefined') return;

    // Clean up existing map
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Wait for Leaflet to be available
    if (!window.L) return;

    const L = window.L;
    
    // Filter projects with coordinates
    const mappableProjects = projectsData.filter(p => p.latitude && p.longitude);
    
    if (mappableProjects.length === 0) {
      return;
    }

    // Calculate center point
    const avgLat = mappableProjects.reduce((sum, p) => sum + p.latitude, 0) / mappableProjects.length;
    const avgLng = mappableProjects.reduce((sum, p) => sum + p.longitude, 0) / mappableProjects.length;

    // Initialize map
    const map = L.map('project-map').setView([avgLat, avgLng], 10);

    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      maxZoom: 19
    }).addTo(map);

    // Add markers for each project
    mappableProjects.forEach(project => {
      const color = getMarkerColor(project.status);
      
      // Create custom icon
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            background-color: ${color};
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          ">📍</div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = L.marker([project.latitude, project.longitude], { icon })
        .bindPopup(`
          <div style="color: #1e293b; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 16px;">${project.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 13px; color: #475569;">${project.address || 'No address'}</p>
            <p style="margin: 0 0 4px 0; font-size: 12px;"><strong>Type:</strong> ${project.projectType || 'Unknown'}</p>
            <p style="margin: 0 0 8px 0; font-size: 12px;"><strong>Status:</strong> <span style="color: ${color}; font-weight: bold;">${(project.status || 'active').toUpperCase()}</span></p>
            <button 
              onclick="window.viewProjectFromMap('${project.id}')"
              style="
                background: #3b82f6;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                width: 100%;
              "
            >View Project</button>
          </div>
        `, {
          maxWidth: 300
        })
        .addTo(map);

      // Add click handler
      marker.on('click', () => {
        setSelectedMapProject(project);
      });
    });

    // Fit map to show all markers
    if (mappableProjects.length > 1) {
      const bounds = L.latLngBounds(mappableProjects.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    mapRef.current = map;
    setMapInitialized(true);
  };

  // Global function to view project from map popup
  if (typeof window !== 'undefined') {
    window.viewProjectFromMap = (projectId) => {
      const project = projects.find(p => p.id === projectId);
      if (project) {
        setSelectedProject(project);
        setView('project-detail');
        setProjectTab('summary'); // Always open to Summary tab
      }
    };
  }

  // Meeting Notes Management Functions
  const addMeetingNote = async (projectId) => {
    if (!newMeetingNote.title.trim() || !newMeetingNote.notes.trim()) return;

    const meetingNote = {
      id: Date.now().toString(),
      title: newMeetingNote.title,
      notes: newMeetingNote.notes,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          meetingNotes: [...(project.meetingNotes || []), meetingNote]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setNewMeetingNote({ title: '', notes: '' });
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    await saveProjects(updatedProjects);
  };

  const updateMeetingNote = async (projectId) => {
    if (!editingMeetingNote.title.trim() || !editingMeetingNote.notes.trim()) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          meetingNotes: project.meetingNotes.map(note =>
            note.id === editingMeetingNote.id ? editingMeetingNote : note
          )
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setEditingMeetingNote(null);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    await saveProjects(updatedProjects);
  };

  const deleteMeetingNote = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          meetingNotes: project.meetingNotes.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Floor Plans Management Functions
  const handleFloorPlanFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, etc.)');
      return;
    }
    
    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewFloorPlan({
        ...newFloorPlan,
        file: file,
        fileUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const addFloorPlan = async (projectId) => {
    if (!newFloorPlan.title.trim() || !newFloorPlan.fileUrl) return;

    const floorPlan = {
      id: Date.now().toString(),
      title: newFloorPlan.title,
      fileUrl: newFloorPlan.fileUrl,
      fileName: newFloorPlan.file?.name || 'floor-plan.png',
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          floorPlans: [...(project.floorPlans || []), floorPlan]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setNewFloorPlan({ title: '', file: null, fileUrl: '' });
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    await saveProjects(updatedProjects);
  };

  const deleteFloorPlan = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          floorPlans: project.floorPlans.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    
    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    setItemToDelete(null);
  };

  // Bid Schedule Management Functions
  const addBidItem = async (projectId) => {
    alert(`addBidItem called! Phase: ${newBidItem.phase}, Date: ${newBidItem.date}`);
    
    if (!newBidItem.phase || !newBidItem.date) {
      console.log('Missing phase or date:', newBidItem);
      alert('Please select both phase and date');
      return;
    }

    try {
      const project = projects.find(p => p.id === projectId);
      if (!project) {
        console.error('Project not found:', projectId);
        alert('Project not found!');
        return;
      }

      const currentBidSchedule = project.bidSchedule || [];

      const bidItem = {
        id: Date.now().toString(),
        phase: newBidItem.phase,
        date: newBidItem.date,
        notes: newBidItem.notes,
        createdAt: new Date().toISOString()
      };

      const updatedProjects = projects.map(p => 
        p.id === projectId 
          ? { ...p, bidSchedule: [...currentBidSchedule, bidItem] }
          : p
      );

      setProjects(updatedProjects);
      
      console.log('About to save to storage...');
      const saveResult = await saveProjects(updatedProjects);
      console.log('Storage save result:', saveResult);

      if (selectedProject?.id === projectId) {
        setSelectedProject(updatedProjects.find(p => p.id === projectId));
      }

      setNewBidItem({ phase: '', date: '', notes: '' });
      console.log('Bid item added successfully:', bidItem);
      alert('Bid item added successfully!');
    } catch (error) {
      console.error('Error adding bid item:', error);
      alert('Error adding bid item: ' + error.message);
    }
  };

  const updateBidItem = async (projectId) => {
    console.log('updateBidItem called with:', { projectId, editingBidItem });
    
    if (!editingBidItem) {
      alert('No bid item to update!');
      return;
    }

    try {
      const updatedProjects = projects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            bidSchedule: project.bidSchedule.map(item =>
              item.id === editingBidItem.id ? editingBidItem : item
            )
          };
        }
        return project;
      });

      console.log('Updated projects:', updatedProjects);
      
      setProjects(updatedProjects);
      
      // Try storage save
      try {
        await saveProjects(updatedProjects);
        console.log('Storage save successful');
      } catch (storageError) {
        console.error('Storage save failed:', storageError);
        alert('Warning: Could not save to storage, but changes are in memory');
      }

      if (selectedProject?.id === projectId) {
        setSelectedProject(updatedProjects.find(p => p.id === projectId));
      }

      setEditingBidItem(null);
      alert('Bid item updated successfully!');
    } catch (error) {
      console.error('Error updating bid item:', error);
      alert('Error: ' + error.message);
    }
  };

  const deleteBidItem = async (projectId, itemId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          bidSchedule: project.bidSchedule.filter(item => item.id !== itemId)
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);

    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  // Project Team Management Functions
  const addTeamMember = async (projectId, contactId) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const currentTeam = project.projectTeam || [];
        
        // Check if contact already in team
        if (currentTeam.some(member => member.contactId === contactId)) {
          alert('This contact is already on the project team');
          return project;
        }

        const teamMember = {
          id: Date.now().toString(),
          contactId: contact.id,
          name: contact.name,
          role: contact.role,
          company: contact.company,
          email: contact.email,
          phone: contact.phone,
          trades: contact.trades,
          addedAt: new Date().toISOString()
        };

        return {
          ...project,
          projectTeam: [...currentTeam, teamMember]
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);

    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
  };

  const removeTeamMember = async (projectId, memberId) => {
    console.log('Removing team member:', memberId, 'from project:', projectId);
    console.log('Current contacts count:', contacts.length);
    
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const beforeCount = (project.projectTeam || []).length;
        const afterTeam = (project.projectTeam || []).filter(member => member.id !== memberId);
        console.log('Team members before:', beforeCount, 'after:', afterTeam.length);
        
        return {
          ...project,
          projectTeam: afterTeam
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);

    if (selectedProject?.id === projectId) {
      const updatedSelectedProject = updatedProjects.find(p => p.id === projectId);
      setSelectedProject(updatedSelectedProject);
    }
    
    console.log('Contacts count after removal:', contacts.length);
    console.log('Team member removed successfully - contacts unchanged');
  };

  // Contact Management Functions
  const addContact = async (contactData) => {
    if (!contactData.name.trim()) return;

    const contact = {
      id: Date.now().toString(),
      name: contactData.name,
      role: contactData.role,
      company: contactData.company,
      email: contactData.email,
      phone: contactData.phone,
      trades: contactData.trades,
      notes: contactData.notes,
      createdAt: new Date().toISOString()
    };

    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    await window.storage.set('contacts', JSON.stringify(updatedContacts));
  };

  const updateContact = async () => {
    if (!editingContact || !editingContact.name.trim()) return;

    const updatedContacts = contacts.map(c => 
      c.id === editingContact.id ? editingContact : c
    );
    
    setContacts(updatedContacts);
    await window.storage.set('contacts', JSON.stringify(updatedContacts));
    setEditingContact(null);
  };

  const deleteContact = async (contactId) => {
    const updatedContacts = contacts.filter(c => c.id !== contactId);
    setContacts(updatedContacts);
    await window.storage.set('contacts', JSON.stringify(updatedContacts));
    setItemToDelete(null);
  };

  const clampReviewMetric = (value, fallback = 0) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.max(0, Math.min(5, parsed));
  };

  const getReviewAverage = (review) => {
    if (review?.metrics) {
      const metrics = review.metrics;
      return (
        clampReviewMetric(metrics.quality) +
        clampReviewMetric(metrics.timeliness) +
        clampReviewMetric(metrics.communication) +
        clampReviewMetric(metrics.budgetAdherence) +
        clampReviewMetric(metrics.safety)
      ) / 5;
    }
    return clampReviewMetric(review?.rating ?? 0);
  };

  const normalizePerformanceReview = (review, projectList = projects) => {
    if (!review || typeof review !== 'object') return null;

    const fallbackRating = clampReviewMetric(review.rating ?? review.overallRating ?? 0);
    const metrics = {
      quality: clampReviewMetric(review.metrics?.quality, fallbackRating),
      timeliness: clampReviewMetric(review.metrics?.timeliness, fallbackRating),
      communication: clampReviewMetric(review.metrics?.communication, fallbackRating),
      budgetAdherence: clampReviewMetric(review.metrics?.budgetAdherence, fallbackRating),
      safety: clampReviewMetric(review.metrics?.safety, fallbackRating)
    };

    let resolvedProjectId = review.projectId || '';
    let resolvedProjectName = review.projectName || '';
    if (resolvedProjectId && !resolvedProjectName) {
      const matchedProject = projectList.find(p => p.id === resolvedProjectId);
      resolvedProjectName = matchedProject?.name || '';
    }
    if (!resolvedProjectId && resolvedProjectName) {
      const matchedProject = projectList.find(
        p => p.name?.toLowerCase() === resolvedProjectName.toLowerCase()
      );
      resolvedProjectId = matchedProject?.id || '';
    }

    return {
      id: review.id ? String(review.id) : Date.now().toString(),
      contactId: review.contactId ? String(review.contactId) : '',
      projectId: resolvedProjectId ? String(resolvedProjectId) : '',
      projectName: resolvedProjectName,
      date: review.date || new Date().toISOString().split('T')[0],
      metrics,
      notes: typeof review.notes === 'string' ? review.notes : '',
      wouldHireAgain: review.wouldHireAgain !== false,
      createdAt: review.createdAt || new Date().toISOString()
    };
  };

  const normalizePerformanceReviews = (reviews, projectList = projects) => {
    if (!Array.isArray(reviews)) return [];
    return reviews
      .map(review => normalizePerformanceReview(review, projectList))
      .filter(Boolean);
  };

  const toStoragePerformanceReview = (review, projectList = projects) => {
    const normalized = normalizePerformanceReview(review, projectList);
    if (!normalized) return null;

    return {
      id: normalized.id,
      contactId: normalized.contactId,
      projectName: normalized.projectName || projectList.find(p => p.id === normalized.projectId)?.name || 'Unknown Project',
      date: normalized.date,
      rating: getReviewAverage(normalized),
      createdAt: normalized.createdAt,
      updatedAt: new Date().toISOString()
    };
  };

  const getLatestPerformanceReviews = async (projectList = projects) => {
    try {
      const reviewsResult = await window.storage.get('performance-reviews');
      if (!reviewsResult) return [];
      return normalizePerformanceReviews(JSON.parse(reviewsResult.value), projectList);
    } catch (error) {
      console.error('Failed to load performance reviews:', error);
      return normalizePerformanceReviews(performanceReviews, projectList);
    }
  };

  const savePerformanceReviews = async (reviewsToSave, projectList = projects) => {
    const normalizedReviews = normalizePerformanceReviews(reviewsToSave, projectList);
    const storagePayload = normalizedReviews
      .map(review => toStoragePerformanceReview(review, projectList))
      .filter(Boolean);

    await window.storage.set('performance-reviews', JSON.stringify(storagePayload));
    setPerformanceReviews(normalizedReviews);
    return normalizedReviews;
  };

  // Performance Review Management Functions
  const addPerformanceReview = async () => {
    if (!newReview.contactId || !newReview.projectId) {
      alert('Please select both a Contact and a Project before adding a review.');
      return;
    }

    try {
      const review = normalizePerformanceReview({
        id: Date.now().toString(),
        ...newReview,
        createdAt: new Date().toISOString()
      }, projects);

      const latestReviews = await getLatestPerformanceReviews(projects);
      const updatedReviews = [...latestReviews, review];

      await savePerformanceReviews(updatedReviews, projects);
      setNewReview({
        contactId: '',
        projectId: '',
        date: new Date().toISOString().split('T')[0],
        metrics: {
          quality: 0,
          timeliness: 0,
          communication: 0,
          budgetAdherence: 0,
          safety: 0
        },
        notes: '',
        wouldHireAgain: true
      });
      alert('Performance review saved.');
    } catch (error) {
      console.error('Error adding performance review:', error);
      alert(`Could not save performance review. ${error?.message || 'Please try again.'}`);
    }
  };

  const updatePerformanceReview = async () => {
    if (!editingReview) return;

    try {
      const normalizedEditingReview = normalizePerformanceReview(editingReview, projects);
      const latestReviews = await getLatestPerformanceReviews(projects);
      let foundReview = false;

      const updatedReviews = latestReviews.map(review => {
        if (review.id === normalizedEditingReview.id) {
          foundReview = true;
          return normalizedEditingReview;
        }
        return review;
      });

      if (!foundReview) {
        updatedReviews.push(normalizedEditingReview);
      }

      await savePerformanceReviews(updatedReviews, projects);
      setEditingReview(null);
    } catch (error) {
      console.error('Error updating performance review:', error);
      alert(`Could not update performance review. ${error?.message || 'Please try again.'}`);
    }
  };

  const deletePerformanceReview = async (reviewId) => {
    try {
      const latestReviews = await getLatestPerformanceReviews(projects);
      const updatedReviews = latestReviews.filter(r => r.id !== reviewId);
      await savePerformanceReviews(updatedReviews, projects);
    } catch (error) {
      console.error('Error deleting performance review:', error);
      alert(`Could not delete performance review. ${error?.message || 'Please try again.'}`);
    }
  };

  const getContactPerformance = (contactId) => {
    const targetContactId = String(contactId);
    const contactReviews = performanceReviews.filter(r => String(r.contactId) === targetContactId);
    if (contactReviews.length === 0) return null;
    
    const totalMetrics = contactReviews.reduce((acc, review) => {
      acc.quality += review.metrics.quality;
      acc.timeliness += review.metrics.timeliness;
      acc.communication += review.metrics.communication;
      acc.budgetAdherence += review.metrics.budgetAdherence;
      acc.safety += review.metrics.safety;
      return acc;
    }, { quality: 0, timeliness: 0, communication: 0, budgetAdherence: 0, safety: 0 });
    
    const count = contactReviews.length;
    const avgQuality = totalMetrics.quality / count;
    const avgTimeliness = totalMetrics.timeliness / count;
    const avgCommunication = totalMetrics.communication / count;
    const avgBudget = totalMetrics.budgetAdherence / count;
    const avgSafety = totalMetrics.safety / count;
    
    const overallAvg = (avgQuality + avgTimeliness + avgCommunication + avgBudget + avgSafety) / 5;
    const wouldHireAgainCount = contactReviews.filter(r => r.wouldHireAgain).length;
    
    return {
      overallRating: overallAvg,
      totalReviews: count,
      metrics: {
        quality: avgQuality,
        timeliness: avgTimeliness,
        communication: avgCommunication,
        budgetAdherence: avgBudget,
        safety: avgSafety
      },
      wouldHireAgainPercentage: (wouldHireAgainCount / count) * 100,
      reviews: contactReviews.sort((a, b) => new Date(b.date) - new Date(a.date))
    };
  };

  // Filter contacts based on search and trade filter
  const getFilteredContacts = () => {
    return contacts.filter(contact => {
      const matchesSearch = contactSearchTerm === '' || 
        contact.name.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(contactSearchTerm.toLowerCase()) ||
        contact.role.toLowerCase().includes(contactSearchTerm.toLowerCase());
      
      const matchesTrade = contactFilterTrade === 'all' || 
        contact.trades.includes(contactFilterTrade);
      
      return matchesSearch && matchesTrade;
    });
  };

  // Get available bid phases (exclude already scheduled ones)
  const getAvailableBidPhases = () => {
    const allPhases = [
      'Pre-Bid Walk',
      'RFI',
      'RFI Responses Issued',
      'Proposal Due',
      'Leveling/Interview',
      'Best and Final'
    ];
    
    if (!selectedProject) return allPhases;
    
    const scheduledPhases = (selectedProject.bidSchedule || []).map(item => item.phase);
    return allPhases.filter(phase => !scheduledPhases.includes(phase));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 sm:p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" className="w-8 h-8 sm:w-10 sm:h-10">
              <rect x="268" y="186" width="100" height="225" fill="#ffffff"/>
              <rect x="490" y="186" width="100" height="708" fill="#ffffff"/>
              <rect x="713" y="186" width="99"  height="225" fill="#ffffff"/>
            </svg>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => setView('home')}
              className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${view === 'home' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              Home
            </button>
            <button
              onClick={() => setView('projects')}
              className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${view === 'projects' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              Projects
            </button>
            <button
              onClick={() => setView('analytics')}
              className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${view === 'analytics' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              Analytics
            </button>
            <button
              onClick={() => setView('team')}
              className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${view === 'team' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              Team
            </button>
            <button
              onClick={() => setView('master')}
              className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap ${view === 'master' ? 'bg-blue-600' : 'bg-slate-800 hover:bg-slate-700'}`}
            >
              Checklist
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        {/* Home Dashboard View */}
        {view === 'home' && (() => {
          const stats = getPortfolioStats();
          const milestones = getUpcomingMilestones();
          const activeProjects = projects.filter(p => (p.status || 'active') === 'active');
          
          // Sort projects by health (most at risk first)
          const sortedProjects = [...activeProjects].sort((a, b) => {
            const healthA = getProjectHealthStatus(a);
            const healthB = getProjectHealthStatus(b);
            return healthA.priority - healthB.priority;
          });

          return (
            <div className="space-y-4 sm:space-y-6">
              {/* High-Level Overview Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1">Budget Health</p>
                  <p className="text-2xl sm:text-3xl font-bold text-yellow-400">
                    {stats.atRiskCount}
                    <span className="text-sm text-slate-400 ml-1">at risk</span>
                  </p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1">Active Projects</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.totalProjects}</p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1">Total Budget</p>
                  <p className="text-xl sm:text-2xl font-bold text-emerald-400">
                    {formatBudget(stats.totalActualBudget.toString())}
                  </p>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                  <p className="text-xs text-slate-400 mb-1">Avg Completion</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-400">{stats.avgCompletion}%</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  ⚡ Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => {
                      setView('map');
                      setMapInitialized(false);
                    }}
                    className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all flex flex-col items-center gap-2 text-center"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
                      📍
                    </div>
                    <div>
                      <p className="font-semibold">Project Map</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {projects.filter(p => p.latitude && p.longitude).length} of {projects.length} mapped
                      </p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setView('analytics')}
                    className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all flex flex-col items-center gap-2 text-center"
                  >
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl">
                      📊
                    </div>
                    <div>
                      <p className="font-semibold">Analytics</p>
                      <p className="text-xs text-slate-400 mt-1">View PMO scorecard</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setView('projects')}
                    className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all flex flex-col items-center gap-2 text-center"
                  >
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-2xl">
                      📁
                    </div>
                    <div>
                      <p className="font-semibold">All Projects</p>
                      <p className="text-xs text-slate-400 mt-1">{projects.length} total</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setView('master')}
                    className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all flex flex-col items-center gap-2 text-center"
                  >
                    <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-2xl">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold">Checklist</p>
                      <p className="text-xs text-slate-400 mt-1">{masterTasks.length} tasks</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Project Health Status */}
              <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  💼 Project Health
                </h3>
                <div className="space-y-3">
                  {sortedProjects.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">No active projects</p>
                  ) : (
                    sortedProjects.map(project => {
                      const health = getProjectHealthStatus(project);
                      const completion = getProjectProgress(project);
                      const budgetUsage = project.approvedBudget > 0 
                        ? Math.round(((getTotalBudget(project) + getTotalChangeOrders(project)) / parseFloat(project.approvedBudget)) * 100)
                        : 0;
                      
                      return (
                        <div 
                          key={project.id}
                          className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedProject(project);
                            setView('project-detail');
                            setProjectTab('summary'); // Always open to Summary tab
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{health.icon}</span>
                              <div>
                                <h4 className="font-semibold">{project.name}</h4>
                                <p className="text-xs text-slate-400">{health.label}</p>
                                {(() => {
                                  const healthScore = calculateProjectHealthScore(project);
                                  return (
                                    <p className={`text-xs mt-1 font-semibold ${
                                      healthScore.status === 'good' ? 'text-green-400' :
                                      healthScore.status === 'warning' ? 'text-yellow-400' :
                                      'text-red-400'
                                    }`}>
                                      Health: {healthScore.overallScore}/100
                                    </p>
                                  );
                                })()}
                                {project.leaseExpiration && (() => {
                                  const daysUntilExpiration = Math.ceil((new Date(project.leaseExpiration) - new Date()) / (1000 * 60 * 60 * 24));
                                  const isExpiringSoon = daysUntilExpiration <= 180 && daysUntilExpiration > 0;
                                  const isExpired = daysUntilExpiration <= 0;
                                  
                                  return (
                                    <p className={`text-xs mt-1 ${
                                      isExpired ? 'text-red-400' :
                                      isExpiringSoon ? 'text-yellow-400' :
                                      'text-slate-400'
                                    }`}>
                                      📅 Lease: {new Date(project.leaseExpiration).toLocaleDateString()}
                                      {isExpired && ' (Expired)'}
                                      {isExpiringSoon && !isExpired && ` (${daysUntilExpiration} days)`}
                                    </p>
                                  );
                                })()}
                              </div>
                            </div>
                            <div className="text-right text-sm">
                              <p className="text-slate-300">Budget: {budgetUsage}%</p>
                              <p className="text-slate-400">Tasks: {completion}%</p>
                            </div>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                health.status === 'risk' ? 'bg-red-600' :
                                health.status === 'warning' ? 'bg-yellow-600' :
                                'bg-green-600'
                              }`}
                              style={{width: `${completion}%`}}
                            ></div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Two Column Layout for Desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Budget Summary Bar Chart */}
                <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    📊 Budget Summary
                  </h3>
                  <div className="space-y-4">
                    {activeProjects.length === 0 ? (
                      <p className="text-slate-400 text-center py-8">No active projects</p>
                    ) : (
                      activeProjects.map(project => {
                        const approved = parseFloat(project.approvedBudget || 0);
                        const actual = getTotalBudget(project) + getTotalChangeOrders(project);
                        const maxBudget = Math.max(approved, actual);
                        
                        return (
                          <div key={project.id} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium truncate">{project.name}</span>
                              <span className="text-slate-400 text-xs">
                                {approved > 0 ? `${Math.round((actual/approved)*100)}%` : 'N/A'}
                              </span>
                            </div>
                            <div className="space-y-1">
                              {/* Approved Budget Bar */}
                              {approved > 0 && (
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-slate-800 rounded-full h-6 overflow-hidden">
                                    <div 
                                      className="bg-blue-600 h-6 flex items-center justify-end pr-2"
                                      style={{width: `${(approved/maxBudget)*100}%`}}
                                    >
                                      <span className="text-xs text-white font-medium">
                                        {formatBudget(approved.toString())}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {/* Actual Budget Bar */}
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-slate-800 rounded-full h-6 overflow-hidden">
                                  <div 
                                    className={`h-6 flex items-center justify-end pr-2 ${
                                      approved > 0 && actual > approved ? 'bg-red-600' : 'bg-emerald-600'
                                    }`}
                                    style={{width: `${(actual/maxBudget)*100}%`}}
                                  >
                                    <span className="text-xs text-white font-medium">
                                      {formatBudget(actual.toString())}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-3 text-xs text-slate-400">
                              <span className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-blue-600 rounded"></span>
                                Approved
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="w-3 h-3 bg-emerald-600 rounded"></span>
                                Actual
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Upcoming Milestones */}
                <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    📅 Next Milestones (30 Days)
                  </h3>
                  <div className="space-y-2">
                    {milestones.length === 0 ? (
                      <p className="text-slate-400 text-center py-8">No upcoming milestones</p>
                    ) : (
                      milestones.map((milestone, idx) => (
                        <div 
                          key={idx}
                          className={`p-3 rounded border-l-4 ${
                            milestone.urgency === 'high' ? 'bg-red-900/20 border-red-600' :
                            milestone.urgency === 'medium' ? 'bg-yellow-900/20 border-yellow-600' :
                            'bg-blue-900/20 border-blue-600'
                          }`}
                          onClick={() => {
                            const project = projects.find(p => p.id === milestone.projectId);
                            if (project) {
                              setSelectedProject(project);
                              setView('project-detail');
                              setProjectTab('summary'); // Always open to Summary tab
                            }
                          }}
                          style={{cursor: 'pointer'}}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{milestone.projectName}</p>
                              <p className="text-xs text-slate-400">{milestone.milestoneName}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-medium">
                                {new Date(milestone.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                              </p>
                              <p className={`text-xs ${
                                milestone.urgency === 'high' ? 'text-red-400' :
                                milestone.urgency === 'medium' ? 'text-yellow-400' :
                                'text-blue-400'
                              }`}>
                                {milestone.daysUntil === 0 ? 'Today' : 
                                 milestone.daysUntil === 1 ? 'Tomorrow' :
                                 `${milestone.daysUntil} days`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Portfolio Stats and Recent Activity Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Portfolio Stats */}
                <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    🏗️ Portfolio Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Total SQFT</p>
                      <p className="text-xl font-bold text-emerald-400">
                        {stats.totalSQFT.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Avg SQFT</p>
                      <p className="text-xl font-bold text-emerald-400">
                        {stats.avgSQFT.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Total Change Orders</p>
                      <p className="text-xl font-bold text-orange-400">
                        {formatBudget(stats.totalChangeOrders.toString())}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Project Types</p>
                      <div className="text-sm">
                        {Object.entries(stats.projectTypes).map(([type, count]) => (
                          <div key={type} className="text-slate-300">
                            {type}: {count}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    🔔 Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {(() => {
                      // Gather all activity from all projects
                      const allActivity = projects.flatMap(project => [
                        ...(project.submittals || []).map(item => ({ 
                          ...item, 
                          type: 'Submittal', 
                          color: 'orange',
                          projectName: project.name,
                          projectId: project.id
                        })),
                        ...(project.rfis || []).map(item => ({ 
                          ...item, 
                          type: 'RFI', 
                          color: 'yellow',
                          projectName: project.name,
                          projectId: project.id
                        })),
                        ...(project.changeOrders || []).map(item => ({ 
                          ...item, 
                          type: 'Change Order', 
                          color: 'red',
                          projectName: project.name,
                          projectId: project.id
                        })),
                        ...(project.permitComments || []).map(item => ({ 
                          ...item, 
                          type: 'Permit', 
                          color: 'purple',
                          projectName: project.name,
                          projectId: project.id
                        })),
                        ...(project.meetingNotes || []).map(item => ({ 
                          ...item, 
                          type: 'Meeting', 
                          color: 'teal',
                          description: item.title,
                          projectName: project.name,
                          projectId: project.id
                        }))
                      ])
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                      .slice(0, 10);

                      if (allActivity.length === 0) {
                        return (
                          <p className="text-sm text-slate-400 text-center py-4">No activity logged yet</p>
                        );
                      }

                      return allActivity.map((item, index) => (
                        <div 
                          key={`${item.type}-${item.id}-${index}`} 
                          className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0 cursor-pointer hover:bg-slate-800/50 p-2 rounded transition-colors"
                          onClick={() => {
                            setSelectedProject(projects.find(p => p.id === item.projectId));
                            setView('project');
                            // Navigate to appropriate tab
                            if (item.type === 'Submittal') setProjectTab('submittals');
                            else if (item.type === 'RFI') setProjectTab('rfis');
                            else if (item.type === 'Change Order') setProjectTab('changeorders');
                            else if (item.type === 'Permit') setProjectTab('permits');
                            else if (item.type === 'Meeting') setProjectTab('meetings');
                          }}
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            item.color === 'orange' ? 'bg-orange-400' :
                            item.color === 'yellow' ? 'bg-yellow-400' :
                            item.color === 'red' ? 'bg-red-400' :
                            item.color === 'teal' ? 'bg-teal-400' :
                            'bg-purple-400'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`text-xs font-medium ${
                                item.color === 'orange' ? 'text-orange-400' :
                                item.color === 'yellow' ? 'text-yellow-400' :
                                item.color === 'red' ? 'text-red-400' :
                                item.color === 'teal' ? 'text-teal-400' :
                                'text-purple-400'
                              }`}>{item.type}</span>
                              <span className="text-xs text-slate-500">•</span>
                              <span className="text-xs text-blue-400 truncate">{item.projectName}</span>
                              <span className="text-xs text-slate-500 ml-auto">
                                {new Date(item.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-slate-300 truncate">{item.description}</p>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>

              {/* Lease Expiration Alerts */}
              {(() => {
                const today = new Date();
                const projectsWithLeases = activeProjects.filter(p => p.leaseExpiration);
                const leaseAlerts = projectsWithLeases
                  .map(project => {
                    const leaseDate = new Date(project.leaseExpiration);
                    const daysUntil = Math.ceil((leaseDate - today) / (1000 * 60 * 60 * 24));
                    
                    let urgency = 'low';
                    if (daysUntil < 0) urgency = 'expired';
                    else if (daysUntil <= 30) urgency = 'critical';
                    else if (daysUntil <= 90) urgency = 'high';
                    else if (daysUntil <= 180) urgency = 'medium';
                    
                    return {
                      project,
                      leaseDate,
                      daysUntil,
                      urgency
                    };
                  })
                  .sort((a, b) => a.daysUntil - b.daysUntil);
                
                if (leaseAlerts.length === 0) return null;
                
                return (
                  <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      📅 Lease Expiration Alerts
                    </h3>
                    <div className="space-y-3">
                      {leaseAlerts.map(alert => (
                        <div
                          key={alert.project.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            alert.urgency === 'expired' ? 'bg-red-900/30 border-red-700 hover:bg-red-900/40' :
                            alert.urgency === 'critical' ? 'bg-red-900/20 border-red-800 hover:bg-red-900/30' :
                            alert.urgency === 'high' ? 'bg-orange-900/20 border-orange-800 hover:bg-orange-900/30' :
                            alert.urgency === 'medium' ? 'bg-yellow-900/20 border-yellow-800 hover:bg-yellow-900/30' :
                            'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                          }`}
                          onClick={() => {
                            setSelectedProject(alert.project);
                            setView('project-detail');
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{alert.project.name}</p>
                              <p className="text-xs text-slate-400 mt-1">
                                {alert.project.address || 'No address'}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-medium">
                                {alert.leaseDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                              </p>
                              <p className={`text-xs font-semibold mt-1 ${
                                alert.urgency === 'expired' ? 'text-red-400' :
                                alert.urgency === 'critical' ? 'text-red-400' :
                                alert.urgency === 'high' ? 'text-orange-400' :
                                alert.urgency === 'medium' ? 'text-yellow-400' :
                                'text-blue-400'
                              }`}>
                                {alert.urgency === 'expired' ? `Expired ${Math.abs(alert.daysUntil)} days ago` :
                                 alert.daysUntil === 0 ? 'Expires Today!' :
                                 alert.daysUntil === 1 ? 'Expires Tomorrow!' :
                                 alert.daysUntil <= 30 ? `${alert.daysUntil} days left` :
                                 alert.daysUntil <= 90 ? `${Math.ceil(alert.daysUntil / 30)} months` :
                                 `${Math.ceil(alert.daysUntil / 30)} months`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Data Backup & Restore - Compact Card */}
              <div className="bg-slate-900 rounded-lg border border-slate-800">
                <button
                  onClick={() => setShowBackupRestore(!showBackupRestore)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl">💾</span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-base font-semibold">Data Backup & Restore</h3>
                      <p className="text-xs text-slate-400">Export or import your data</p>
                    </div>
                  </div>
                  {showBackupRestore ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </button>

                {showBackupRestore && (
                  <div className="px-4 pb-4 space-y-3 border-t border-slate-800 pt-4">
                    <div className="grid grid-cols-2 gap-3">
                      {/* Export Button */}
                      <button
                        onClick={exportData}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 transition-all flex flex-col items-center gap-2"
                      >
                        <span className="text-2xl">📥</span>
                        <span className="text-sm font-semibold">Export</span>
                      </button>
                      
                      {/* Import Button */}
                      <label className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-3 transition-all flex flex-col items-center gap-2 cursor-pointer">
                        <span className="text-2xl">📤</span>
                        <span className="text-sm font-semibold">Import</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={importData}
                          className="hidden"
                        />
                      </label>
                    </div>
                    
                    <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-2">
                      <p className="text-xs text-yellow-200">
                        <strong>⚠️ Note:</strong> Import replaces all data. Export before importing.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Projects View */}
        {view === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">
                Projects ({projects.filter(p => (p.status || 'active') === projectView).length})
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setProjectView(projectView === 'active' ? 'archived' : 'active')}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  {projectView === 'active' ? '📦 Archive' : '📂 Active'}
                </button>
                <button
                  onClick={() => setView('create-project')}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <FolderPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">New Project</span>
                  <span className="sm:hidden">New</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter(project => (project.status || 'active') === projectView)
                .map(project => {
                const progress = getProjectProgress(project);
                const schedule = project.schedule || [];
                
                return (
                  <div
                    key={project.id}
                    className="bg-slate-900 rounded-lg p-3 sm:p-4 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedProject(project);
                      setExpandedProjectTasks({});  // Reset so all tasks start collapsed
                      setView('project-detail');
                      setProjectTab('summary'); // Always open to Summary tab
                    }}
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg mb-1">{project.name}</h3>
                        {project.address && (
                          <p className="text-xs text-slate-400 mb-2">{project.address}</p>
                        )}
                        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                          {project.projectType && (
                            <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded text-xs">
                              {project.projectType}
                            </span>
                          )}
                          {project.approvedBudget && parseFloat(project.approvedBudget) > 0 && (
                            <span className="px-2 py-1 bg-purple-900/50 text-purple-200 rounded text-xs">
                              Approved: {formatBudget(project.approvedBudget)}
                            </span>
                          )}
                          {getTotalBudget(project) > 0 && (
                            <span className="px-2 py-1 bg-emerald-900/50 text-emerald-200 rounded text-xs">
                              Budget: {formatBudget(getTotalBudget(project).toString())}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProject(project);
                            setShowEditModal(true);
                          }}
                          className="text-blue-400 hover:text-blue-300 p-1"
                          title="Edit project"
                        >
                          <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDeleteProject(project.id);
                          }}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Default Milestone Schedule Items Only */}
                    {schedule.length > 0 && (
                      <div className="mb-3 text-xs text-slate-400 space-y-1">
                        {schedule
                          .filter(item => 
                            MILESTONE_ORDER.includes(item.name)
                          )
                          .sort((a, b) => {
                            const order = MILESTONE_ORDER;
                            return order.indexOf(a.name) - order.indexOf(b.name);
                          })
                          .map(item => (
                            <div key={item.id}>
                              <span className="font-medium">{item.name}:</span>{' '}
                              {item.targetStartDate ? formatDateDisplay(item.targetStartDate) : (item.approvedStartDate ? formatDateDisplay(item.approvedStartDate) : 'Not set')}
                            </div>
                          ))}
                      </div>
                    )}
                    
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                        <span>{project.tasks.filter(t => t.completed).length} / {project.tasks.length} tasks</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-xs text-slate-400">
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analytics View */}
        {view === 'analytics' && (() => {
          const pmoScorecard = calculatePMOScorecard();
          const activeProjects = projects.filter(p => (p.status || 'active') === 'active');
          
          return (
            <div className="space-y-6">
              {/* Page Header */}
              <div>
                <h2 className="text-2xl font-bold mb-2">📊 Analytics & Scorecards</h2>
                <p className="text-slate-400">Performance metrics and portfolio health indicators</p>
              </div>

              {/* PMO Performance Scorecard */}
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                <h3 className="text-xl font-bold mb-4">PMO Performance Scorecard</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-2">On-Time Delivery</p>
                    <p className="text-3xl font-bold mb-2">{pmoScorecard.onTimeDelivery}%</p>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          pmoScorecard.onTimeDelivery >= 80 ? 'bg-green-600' :
                          pmoScorecard.onTimeDelivery >= 60 ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}
                        style={{width: `${pmoScorecard.onTimeDelivery}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-2">Budget Adherence</p>
                    <p className="text-3xl font-bold mb-2">{pmoScorecard.budgetAdherence}%</p>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          pmoScorecard.budgetAdherence >= 80 ? 'bg-green-600' :
                          pmoScorecard.budgetAdherence >= 60 ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}
                        style={{width: `${pmoScorecard.budgetAdherence}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-2">Scope Management</p>
                    <p className="text-3xl font-bold mb-2">{pmoScorecard.scopeManagement}%</p>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          pmoScorecard.scopeManagement >= 80 ? 'bg-green-600' :
                          pmoScorecard.scopeManagement >= 60 ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}
                        style={{width: `${pmoScorecard.scopeManagement}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-2">Quality Score</p>
                    <p className="text-3xl font-bold mb-2">{pmoScorecard.qualityScore}/100</p>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          pmoScorecard.qualityScore >= 80 ? 'bg-green-600' :
                          pmoScorecard.qualityScore >= 60 ? 'bg-yellow-600' :
                          'bg-red-600'
                        }`}
                        style={{width: `${pmoScorecard.qualityScore}%`}}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Overall PMO Health */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg p-6 border border-blue-800/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Overall PMO Health Score</p>
                      <p className="text-5xl font-bold">{pmoScorecard.overallScore}<span className="text-2xl text-slate-400">/100</span></p>
                    </div>
                    <div className="text-6xl">
                      {pmoScorecard.overallScore >= 80 ? '🟢' :
                       pmoScorecard.overallScore >= 60 ? '🟡' :
                       '🔴'}
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-slate-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        pmoScorecard.overallScore >= 80 ? 'bg-green-600' :
                        pmoScorecard.overallScore >= 60 ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}
                      style={{width: `${pmoScorecard.overallScore}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Based on {pmoScorecard.totalProjects} active projects</p>
                </div>
              </div>

              {/* Project Health Scores */}
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                <h3 className="text-xl font-bold mb-4">Project Health Scores</h3>
                {activeProjects.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No active projects to analyze</p>
                ) : (
                  <div className="space-y-4">
                    {activeProjects.map(project => {
                      const health = calculateProjectHealthScore(project);
                      
                      return (
                        <div 
                          key={project.id}
                          className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedProject(project);
                            setView('project-detail');
                            setProjectTab('summary'); // Always open to Summary tab
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-lg">{project.name}</h4>
                              <p className="text-sm text-slate-400">{project.address || 'No address'}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold">{health.overallScore}/100</p>
                              <p className={`text-xs font-semibold ${
                                health.status === 'good' ? 'text-green-400' :
                                health.status === 'warning' ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {health.status === 'good' ? '🟢 HEALTHY' :
                                 health.status === 'warning' ? '🟡 AT RISK' :
                                 '🔴 CRITICAL'}
                              </p>
                            </div>
                          </div>

                          {/* Metric Cards */}
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="bg-slate-900 rounded p-3">
                              <p className="text-xs text-slate-400 mb-1">Schedule</p>
                              <p className="text-sm font-semibold">SPI: {health.schedule.spi}</p>
                              <p className={`text-xs ${
                                health.schedule.status === 'good' ? 'text-green-400' :
                                health.schedule.status === 'warning' ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {health.schedule.status === 'good' ? '✓ On Track' :
                                 health.schedule.status === 'warning' ? '⚠ Watch' :
                                 '✗ Behind'}
                              </p>
                            </div>

                            <div className="bg-slate-900 rounded p-3">
                              <p className="text-xs text-slate-400 mb-1">Budget</p>
                              <p className="text-sm font-semibold">{health.cost.percentUsed}% Used</p>
                              <p className={`text-xs ${
                                health.cost.status === 'good' ? 'text-green-400' :
                                health.cost.status === 'warning' ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {health.cost.status === 'good' ? '✓ On Budget' :
                                 health.cost.status === 'warning' ? '⚠ Watch' :
                                 '✗ Over Budget'}
                              </p>
                            </div>

                            <div className="bg-slate-900 rounded p-3">
                              <p className="text-xs text-slate-400 mb-1">Quality</p>
                              <p className="text-sm font-semibold">{health.quality.score}/100</p>
                              <p className={`text-xs ${
                                health.quality.status === 'good' ? 'text-green-400' :
                                health.quality.status === 'warning' ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {health.quality.status === 'good' ? '✓ Excellent' :
                                 health.quality.status === 'warning' ? '⚠ Fair' :
                                 '✗ Poor'}
                              </p>
                            </div>

                            <div className="bg-slate-900 rounded p-3">
                              <p className="text-xs text-slate-400 mb-1">Tasks</p>
                              <p className="text-sm font-semibold">{health.taskCompletion}% Done</p>
                              <p className={`text-xs ${
                                health.taskCompletion >= 75 ? 'text-green-400' :
                                health.taskCompletion >= 50 ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {health.taskCompletion >= 75 ? '✓ On Track' :
                                 health.taskCompletion >= 50 ? '⚠ Progress' :
                                 '✗ Behind'}
                              </p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="mt-3">
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  health.status === 'good' ? 'bg-green-600' :
                                  health.status === 'warning' ? 'bg-yellow-600' :
                                  'bg-red-600'
                                }`}
                                style={{width: `${health.overallScore}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Key Performance Indicators */}
              <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                <h3 className="text-xl font-bold mb-4">📊 Portfolio KPIs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">KPI</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-300">Current</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-300">Target</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-slate-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 px-4 text-sm">On-Time Delivery Rate</td>
                        <td className="text-center py-3 px-4 text-sm font-semibold">{pmoScorecard.onTimeDelivery}%</td>
                        <td className="text-center py-3 px-4 text-sm text-slate-400">≥80%</td>
                        <td className="text-center py-3 px-4">
                          <span className={`text-sm font-semibold ${
                            pmoScorecard.onTimeDelivery >= 80 ? 'text-green-400' : 'text-yellow-400'
                          }`}>
                            {pmoScorecard.onTimeDelivery >= 80 ? '🟢 GOOD' : '🟡 NEEDS IMPROVEMENT'}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 px-4 text-sm">Budget Adherence Rate</td>
                        <td className="text-center py-3 px-4 text-sm font-semibold">{pmoScorecard.budgetAdherence}%</td>
                        <td className="text-center py-3 px-4 text-sm text-slate-400">≥80%</td>
                        <td className="text-center py-3 px-4">
                          <span className={`text-sm font-semibold ${
                            pmoScorecard.budgetAdherence >= 80 ? 'text-green-400' : 'text-yellow-400'
                          }`}>
                            {pmoScorecard.budgetAdherence >= 80 ? '🟢 GOOD' : '🟡 NEEDS IMPROVEMENT'}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-800">
                        <td className="py-3 px-4 text-sm">Change Order Percentage</td>
                        <td className="text-center py-3 px-4 text-sm font-semibold">{pmoScorecard.scopeManagement}%</td>
                        <td className="text-center py-3 px-4 text-sm text-slate-400">{'<'}10%</td>
                        <td className="text-center py-3 px-4">
                          <span className={`text-sm font-semibold ${
                            pmoScorecard.scopeManagement >= 80 ? 'text-green-400' : 'text-yellow-400'
                          }`}>
                            {pmoScorecard.scopeManagement >= 80 ? '🟢 GOOD' : '🟡 NEEDS IMPROVEMENT'}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm">Average Quality Score</td>
                        <td className="text-center py-3 px-4 text-sm font-semibold">{pmoScorecard.qualityScore}/100</td>
                        <td className="text-center py-3 px-4 text-sm text-slate-400">≥80</td>
                        <td className="text-center py-3 px-4">
                          <span className={`text-sm font-semibold ${
                            pmoScorecard.qualityScore >= 80 ? 'text-green-400' : 'text-yellow-400'
                          }`}>
                            {pmoScorecard.qualityScore >= 80 ? '🟢 GOOD' : '🟡 NEEDS IMPROVEMENT'}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Map View */}
        {view === 'map' && (
          <div key="map-view" className="space-y-6">
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-bold mb-2">📍 Project Locations</h2>
              <p className="text-slate-400">Interactive map showing all project locations</p>
            </div>

            {/* Map Container */}
            <div key="map-container" className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden relative">
              <div 
                id="project-map" 
                style={{ 
                  height: '600px', 
                  width: '100%',
                  background: '#1e293b',
                  position: 'relative',
                  zIndex: 0
                }} 
              />
              {projects.filter(p => p.latitude && p.longitude).length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
                  <div className="text-center p-8">
                    <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg mb-2">No projects mapped yet</p>
                    <p className="text-slate-500 text-sm">Add coordinates to projects below to see them on the map</p>
                  </div>
                </div>
              )}
            </div>

            {/* Map Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                <p className="text-xs text-slate-400 mb-1">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                <p className="text-xs text-slate-400 mb-1">Mapped</p>
                <p className="text-2xl font-bold text-green-400">
                  {projects.filter(p => p.latitude && p.longitude).length}
                </p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                <p className="text-xs text-slate-400 mb-1">Unmapped</p>
                <p className="text-2xl font-bold text-amber-400">
                  {projects.filter(p => !p.latitude || !p.longitude).length}
                </p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                <p className="text-xs text-slate-400 mb-1">Active</p>
                <p className="text-2xl font-bold text-blue-400">
                  {projects.filter(p => (p.status || 'active') === 'active').length}
                </p>
              </div>
            </div>

            {/* Project Cards with Geocoding */}
            <div>
              <h3 className="text-xl font-bold mb-4">Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map(project => {
                  const hasCoordinates = project.latitude && project.longitude;
                  const statusColor = getMarkerColor(project.status);
                  
                  return (
                    <div 
                      key={project.id} 
                      className="bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1">{project.name}</h4>
                          <p className="text-sm text-slate-400">{project.address || 'No address'}</p>
                        </div>
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                          style={{ backgroundColor: statusColor }}
                          title={project.status || 'active'}
                        />
                      </div>

                      <div className="flex items-center gap-2 text-sm mb-3">
                        <span className="px-2 py-1 bg-slate-800 rounded text-xs">
                          {project.projectType || 'Standard'}
                        </span>
                        {hasCoordinates ? (
                          <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Mapped
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-amber-900/30 text-amber-400 rounded text-xs">
                            Not Mapped
                          </span>
                        )}
                      </div>

                      {hasCoordinates && (
                        <p className="text-xs text-slate-500 mb-3">
                          📍 {project.latitude.toFixed(4)}, {project.longitude.toFixed(4)}
                        </p>
                      )}

                      <div className="flex gap-2">
                        {!hasCoordinates && project.address && (
                          <button
                            onClick={() => geocodeAddress(project)}
                            disabled={geocodingProject === project.id}
                            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {geocodingProject === project.id ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Geocoding...
                              </>
                            ) : (
                              <>
                                <MapPin className="w-4 h-4" />
                                Add to Map
                              </>
                            )}
                          </button>
                        )}
                        {hasCoordinates && (
                          <button
                            onClick={() => {
                              if (mapRef.current) {
                                mapRef.current.setView([project.latitude, project.longitude], 15);
                              }
                            }}
                            className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 rounded text-sm flex items-center justify-center gap-2"
                          >
                            <MapPin className="w-4 h-4" />
                            Show on Map
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setView('project-detail');
                            setProjectTab('summary'); // Always open to Summary tab
                          }}
                          className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm"
                        >
                          View Project
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {projects.length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <p>No projects yet. Create your first project to get started!</p>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
              <h4 className="font-bold mb-3">Map Legend</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span>Active Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <span>Completed Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber-500" />
                  <span>On-Hold Projects</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Directory View */}
        {view === 'team' && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">Team Directory ({contacts.length})</h2>
              {teamTab === 'contacts' && (
                <button
                  onClick={() => setEditingContact({ id: 'new', name: '', role: '', company: '', email: '', phone: '', trades: [], notes: '' })}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  Add Contact
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setTeamTab('contacts')}
                className={`px-4 py-2 rounded whitespace-nowrap ${
                  teamTab === 'contacts' 
                    ? 'bg-blue-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                📇 Contacts ({contacts.length})
              </button>
              <button
                onClick={() => setTeamTab('performance')}
                className={`px-4 py-2 rounded whitespace-nowrap ${
                  teamTab === 'performance' 
                    ? 'bg-emerald-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                ⭐ Performance Tracker ({performanceReviews.length} reviews)
              </button>
            </div>

            {/* Contacts Tab */}
            {teamTab === 'contacts' && (
              <div>
                {/* Search and Filter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <input
                    type="text"
                    placeholder="Search by name, company, or role..."
                    value={contactSearchTerm}
                    onChange={(e) => setContactSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                  <select
                    value={contactFilterTrade}
                    onChange={(e) => setContactFilterTrade(e.target.value)}
                    className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">All Trades</option>
                    {allTeams.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>

                {/* Contacts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredContacts().length === 0 ? (
                <div className="col-span-full bg-slate-900 rounded-lg p-8 text-center text-slate-400 border border-slate-800">
                  No contacts found. Add your first contact to get started.
                </div>
              ) : (
                getFilteredContacts().map(contact => (
                  <div
                    key={contact.id}
                    className="bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                    onClick={() => setExpandedContacts(prev => ({ ...prev, [contact.id]: !prev[contact.id] }))}
                  >
                    {/* Always visible - Name, Title, Company */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        <p className="text-sm text-slate-400">{contact.role}</p>
                        <p className="text-sm text-blue-400">{contact.company}</p>
                      </div>
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setEditingContact({ ...contact })}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => confirmDelete('contact', contact.id, null, contact.name)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Expandable details */}
                    {expandedContacts[contact.id] && (
                      <div className="mt-3 pt-3 border-t border-slate-800 space-y-2 text-sm" onClick={(e) => e.stopPropagation()}>
                        {contact.email && (
                          <div className="flex items-center gap-2 text-slate-300">
                            <Mail className="w-4 h-4 text-slate-500" />
                            <a href={`mailto:${contact.email}`} className="hover:text-blue-400">
                              {contact.email}
                            </a>
                          </div>
                        )}
                        {contact.phone && (
                          <div className="flex items-center gap-2 text-slate-300">
                            <Phone className="w-4 h-4 text-slate-500" />
                            <a href={`tel:${contact.phone}`} className="hover:text-blue-400">
                              {formatPhone(contact.phone)}
                            </a>
                          </div>
                        )}
                        {contact.trades.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {contact.trades.map(trade => (
                              <span key={trade} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-xs">
                                {trade}
                              </span>
                            ))}
                          </div>
                        )}
                        {contact.notes && (
                          <div className="mt-2 p-2 bg-slate-800/50 rounded text-slate-300">
                            <p className="text-xs text-slate-400 mb-1">Notes:</p>
                            <p>{contact.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
              </div>
            )}

            {/* Performance Tracker Tab */}
            {teamTab === 'performance' && (
              <div className="space-y-6">
                {/* Performance Overview */}
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4">🏆 Top Performers</h3>
                  <div className="space-y-3">
                    {contacts
                      .map(contact => ({
                        ...contact,
                        performance: getContactPerformance(contact.id)
                      }))
                      .filter(c => c.performance)
                      .sort((a, b) => b.performance.overallRating - a.performance.overallRating)
                      .slice(0, 5)
                      .map((contact, index) => (
                        <div
                          key={contact.id}
                          className="flex items-center justify-between p-3 bg-slate-800/50 rounded hover:bg-slate-800 cursor-pointer transition-colors"
                          onClick={() => setSelectedPerformanceContact(contact.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-slate-500 w-8">#{index + 1}</div>
                            <div>
                              <div className="font-semibold">{contact.name}</div>
                              <div className="text-sm text-slate-400">{contact.role} - {contact.company}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-lg ${i < Math.round(contact.performance.overallRating) ? 'text-yellow-400' : 'text-slate-600'}`}>
                                  ⭐
                                </span>
                              ))}
                              <span className="ml-2 font-bold text-yellow-400">{contact.performance.overallRating.toFixed(1)}</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              {contact.performance.totalReviews} project{contact.performance.totalReviews !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      ))}
                    {contacts.filter(c => getContactPerformance(c.id)).length === 0 && (
                      <p className="text-center text-slate-400 py-8">No performance reviews yet. Add your first review below.</p>
                    )}
                  </div>
                </div>

                {/* Add Review Form */}
                <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4">➕ Add Performance Review</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Contact *</label>
                        <select
                          value={newReview.contactId}
                          onChange={(e) => setNewReview({ ...newReview, contactId: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select Contact</option>
                          {contacts.map(contact => (
                            <option key={contact.id} value={contact.id}>
                              {contact.name} - {contact.role}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Project *</label>
                        <select
                          value={newReview.projectId}
                          onChange={(e) => setNewReview({ ...newReview, projectId: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select Project</option>
                          {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Review Date</label>
                      <input
                        type="date"
                        value={newReview.date}
                        onChange={(e) => setNewReview({ ...newReview, date: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-4">Performance Metrics (0-5)</label>
                      <div className="space-y-3">
                        {Object.entries({
                          quality: 'Quality of Work',
                          timeliness: 'Timeliness',
                          communication: 'Communication',
                          budgetAdherence: 'Budget Adherence',
                          safety: 'Safety'
                        }).map(([key, label]) => (
                          <div key={key} className="flex items-center gap-4">
                            <label className="w-40 text-sm text-slate-300">{label}:</label>
                            <div className="flex gap-2">
                              {[0, 1, 2, 3, 4, 5].map(rating => (
                                <button
                                  key={rating}
                                  onClick={() => setNewReview({
                                    ...newReview,
                                    metrics: { ...newReview.metrics, [key]: rating }
                                  })}
                                  className={`w-10 h-10 rounded border-2 transition-colors ${
                                    newReview.metrics[key] === rating
                                      ? 'bg-yellow-500 border-yellow-400 text-white font-bold'
                                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                                  }`}
                                >
                                  {rating}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                      <textarea
                        value={newReview.notes}
                        onChange={(e) => setNewReview({ ...newReview, notes: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none resize-none"
                        rows="3"
                        placeholder="Additional feedback or comments..."
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="wouldHireAgain"
                        checked={newReview.wouldHireAgain}
                        onChange={(e) => setNewReview({ ...newReview, wouldHireAgain: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-700 bg-slate-800"
                      />
                      <label htmlFor="wouldHireAgain" className="text-sm text-slate-300">
                        Would hire again
                      </label>
                    </div>

                    <button
                      onClick={addPerformanceReview}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Review
                    </button>
                  </div>
                </div>

                {/* Contact Performance Details */}
                {selectedPerformanceContact && (() => {
                  const contact = contacts.find(c => c.id === selectedPerformanceContact);
                  const perf = getContactPerformance(selectedPerformanceContact);
                  if (!contact || !perf) return null;

                  return (
                    <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">
                          Performance Details - {contact.name}
                        </h3>
                        <button
                          onClick={() => setSelectedPerformanceContact(null)}
                          className="text-slate-400 hover:text-slate-300"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-yellow-400">{perf.overallRating.toFixed(1)}</div>
                          <div className="text-sm text-slate-400 mt-1">Overall Rating</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-blue-400">{perf.totalReviews}</div>
                          <div className="text-sm text-slate-400 mt-1">Total Projects</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-green-400">{perf.wouldHireAgainPercentage.toFixed(0)}%</div>
                          <div className="text-sm text-slate-400 mt-1">Would Hire Again</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Average Metrics</h4>
                        <div className="space-y-2">
                          {Object.entries({
                            quality: 'Quality',
                            timeliness: 'Timeliness',
                            communication: 'Communication',
                            budgetAdherence: 'Budget',
                            safety: 'Safety'
                          }).map(([key, label]) => (
                            <div key={key} className="flex items-center gap-3">
                              <div className="w-32 text-sm text-slate-400">{label}:</div>
                              <div className="flex-1 bg-slate-800 rounded-full h-6 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full flex items-center justify-center text-xs font-bold text-white"
                                  style={{ width: `${(perf.metrics[key] / 5) * 100}%` }}
                                >
                                  {perf.metrics[key].toFixed(1)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Project Reviews</h4>
                        <div className="space-y-3">
                          {perf.reviews.map(review => {
                            const project = projects.find(p => p.id === review.projectId);
                            return (
                              <div key={review.id} className="bg-slate-800/50 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <div className="font-semibold">{project?.name || review.projectName || 'Unknown Project'}</div>
                                    <div className="text-sm text-slate-400">{new Date(review.date).toLocaleDateString()}</div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => {
                                      const avg = (review.metrics.quality + review.metrics.timeliness + review.metrics.communication + review.metrics.budgetAdherence + review.metrics.safety) / 5;
                                      return (
                                        <span key={i} className={`${i < Math.round(avg) ? 'text-yellow-400' : 'text-slate-600'}`}>
                                          ⭐
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                                {review.notes && (
                                  <p className="text-sm text-slate-300 mb-2">{review.notes}</p>
                                )}
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                  <span>Q: {review.metrics.quality}</span>
                                  <span>T: {review.metrics.timeliness}</span>
                                  <span>C: {review.metrics.communication}</span>
                                  <span>B: {review.metrics.budgetAdherence}</span>
                                  <span>S: {review.metrics.safety}</span>
                                  {review.wouldHireAgain && <span className="text-green-400">✓ Would Hire Again</span>}
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <button
                                    onClick={() => setEditingReview({ ...review })}
                                    className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deletePerformanceReview(review.id)}
                                    className="text-xs px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Add/Edit Contact Modal */}
            {editingContact && (
              <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-4 z-50 overflow-y-auto">
                <div className="bg-slate-900 rounded-lg p-6 max-w-2xl w-full my-8 border border-slate-800">
                  <h3 className="text-xl font-semibold mb-4">
                    {editingContact.id === 'new' ? 'Add Contact' : 'Edit Contact'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
                      <input
                        type="text"
                        value={editingContact.name}
                        onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                        placeholder="John Smith"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                        <input
                          type="text"
                          value={editingContact.role}
                          onChange={(e) => setEditingContact({ ...editingContact, role: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                          placeholder="Project Manager"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                        <input
                          type="text"
                          value={editingContact.company}
                          onChange={(e) => setEditingContact({ ...editingContact, company: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                          placeholder="ABC Construction"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input
                          type="email"
                          value={editingContact.email}
                          onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={editingContact.phone}
                          onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                          placeholder="555-1234"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Trades/Specialties</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {allTeams.map(trade => (
                          <label key={trade} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingContact.trades.includes(trade)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setEditingContact({ 
                                    ...editingContact, 
                                    trades: [...editingContact.trades, trade] 
                                  });
                                } else {
                                  setEditingContact({ 
                                    ...editingContact, 
                                    trades: editingContact.trades.filter(t => t !== trade) 
                                  });
                                }
                              }}
                              className="rounded border-slate-700 bg-slate-800"
                            />
                            <span className="text-sm text-slate-300">{trade}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                      <textarea
                        value={editingContact.notes}
                        onChange={(e) => setEditingContact({ ...editingContact, notes: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                        rows="3"
                        placeholder="Additional notes..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => {
                        if (editingContact.id === 'new') {
                          addContact(editingContact);
                        } else {
                          updateContact();
                        }
                        setEditingContact(null);
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      {editingContact.id === 'new' ? 'Add Contact' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setEditingContact(null)}
                      className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create Project View */}
        {view === 'create-project' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-6">Create New Project</h2>
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-800 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    value={newProjectForm.name}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter project address"
                    value={newProjectForm.address}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, address: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Square Footage (SQFT)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter SQFT"
                    value={newProjectForm.sqft}
                    onChange={(e) => {
                      // Only allow numbers and commas
                      const value = e.target.value.replace(/[^\d,]/g, '');
                      setNewProjectForm({ ...newProjectForm, sqft: value });
                    }}
                    className="w-full px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Type
                  </label>
                  <select
                    value={newProjectForm.projectType}
                    onChange={(e) => {
                      if (e.target.value === '__ADD_NEW__') {
                        setShowNewProjectTypeInput(true);
                      } else {
                        setNewProjectForm({ ...newProjectForm, projectType: e.target.value });
                      }
                    }}
                    className="w-full px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                  >
                    {allProjectTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                    <option value="__ADD_NEW__">+ Add Custom Type</option>
                  </select>
                  
                  {showNewProjectTypeInput && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={newProjectTypeName}
                        onChange={(e) => setNewProjectTypeName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addNewProjectType()}
                        placeholder="Enter new project type"
                        className="flex-1 px-3 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none text-sm"
                        autoFocus
                      />
                      <button
                        onClick={addNewProjectType}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setShowNewProjectTypeInput(false);
                          setNewProjectTypeName('');
                        }}
                        className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Approved Budget
                  </label>
                  <input
                    type="text"
                    placeholder="Enter approved budget"
                    value={formatBudget(newProjectForm.approvedBudget)}
                    onChange={(e) => {
                      const rawValue = parseBudget(e.target.value);
                      setNewProjectForm({ ...newProjectForm, approvedBudget: rawValue });
                    }}
                    className="w-full px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-xs text-slate-400 mt-1">This will be compared against actual budget in the Budget section</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Lease Expiration (Optional)
                  </label>
                  <input
                    type="date"
                    value={newProjectForm.leaseExpiration || ''}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, leaseExpiration: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                  <p className="text-xs text-slate-400 mt-1">Track when the lease expires for this location</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Logo (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setNewProjectForm({ ...newProjectForm, logo: event.target.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  />
                  {newProjectForm.logo && (
                    <div className="mt-2">
                      <img src={newProjectForm.logo} alt="Logo preview" className="h-16 object-contain" />
                      <button
                        onClick={() => setNewProjectForm({ ...newProjectForm, logo: '' })}
                        className="mt-1 text-xs text-red-400 hover:text-red-300"
                      >
                        Remove logo
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-slate-400 mt-1">Logo will appear on exported PDF reports</p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={createProject}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                  Create Project
                </button>
                <button
                  onClick={() => setView('projects')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded"
                >
                  Cancel
                </button>
              </div>
              <div className="mt-4 text-sm text-slate-400">
                This will create a project with all {masterTasks.length} tasks from the master checklist.
              </div>
            </div>
          </div>
        )}

        {/* Checklist View */}
        {view === 'master' && (
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">Checklist ({masterTasks.length} tasks)</h2>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept=".csv"
                  onChange={importTasksFromCSV}
                  className="hidden"
                  id="csv-upload"
                  disabled={importingCSV}
                />
                <label
                  htmlFor="csv-upload"
                  className={`px-4 py-2 rounded flex items-center gap-2 cursor-pointer ${
                    importingCSV 
                      ? 'bg-slate-600 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">{importingCSV ? 'Importing...' : 'Import CSV'}</span>
                  <span className="sm:hidden">{importingCSV ? '...' : 'Import'}</span>
                </label>
              </div>
            </div>
            
            {/* Add Task Form */}
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
              <h3 className="font-semibold mb-3">Add New Task</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Task Name *"
                  value={newTaskForm.task}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, task: e.target.value })}
                  className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
                
                {/* Team Selection */}
                <div>
                  {showNewTeamInput ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="New team name"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        className="flex-1 px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={addNewTeam}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setShowNewTeamInput(false);
                          setNewTeamName('');
                        }}
                        className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <select
                        value={newTaskForm.team}
                        onChange={(e) => setNewTaskForm({ ...newTaskForm, team: e.target.value })}
                        className="flex-1 px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Team</option>
                        {allTeams.map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => setShowNewTeamInput(true)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                        title="Add new team"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Subdivision Selection */}
                <div>
                  {showNewSubdivisionInput ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="New subdivision name"
                        value={newSubdivisionName}
                        onChange={(e) => setNewSubdivisionName(e.target.value)}
                        className="flex-1 px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        onClick={addNewSubdivision}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setShowNewSubdivisionInput(false);
                          setNewSubdivisionName('');
                        }}
                        className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <select
                        value={newTaskForm.subdivision}
                        onChange={(e) => setNewTaskForm({ ...newTaskForm, subdivision: e.target.value })}
                        className="flex-1 px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Subdivision</option>
                        {allSubdivisions.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => setShowNewSubdivisionInput(true)}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                        title="Add new subdivision"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Notes (optional)"
                  value={newTaskForm.notes}
                  onChange={(e) => setNewTaskForm({ ...newTaskForm, notes: e.target.value })}
                  className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={addMasterTask}
                className="mt-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                Add Task
              </button>
            </div>

            {/* Search and Filters - Improved Layout */}
            <div className="bg-slate-900 rounded-lg p-3 sm:p-4 border border-slate-800 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <select
                  value={filterTeam}
                  onChange={(e) => setFilterTeam(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none sm:min-w-[150px]"
                >
                  <option value="all">All Teams</option>
                  {allTeams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
                <select
                  value={filterSubdivision}
                  onChange={(e) => setFilterSubdivision(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none sm:min-w-[180px]"
                >
                  <option value="all">All Subdivisions</option>
                  {allSubdivisions.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
              {getFilteredTasks(masterTasks).map(task => (
                <div
                  key={task.id}
                  className="bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700"
                >
                  {editingTask?.id === task.id ? (
                    // Edit Mode
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          value={editingTask.task}
                          onChange={(e) => setEditingTask({ ...editingTask, task: e.target.value })}
                          className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                        />
                        <select
                          value={editingTask.team}
                          onChange={(e) => setEditingTask({ ...editingTask, team: e.target.value })}
                          className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select Team</option>
                          {allTeams.map(team => (
                            <option key={team} value={team}>{team}</option>
                          ))}
                        </select>
                        <select
                          value={editingTask.subdivision}
                          onChange={(e) => setEditingTask({ ...editingTask, subdivision: e.target.value })}
                          className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                        >
                          <option value="">Select Subdivision</option>
                          {allSubdivisions.map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={editingTask.notes}
                          onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                          placeholder="Notes"
                          className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={async () => {
                            await updateMasterTask();
                          }}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            confirmDelete('master-task', editingTask.id, null, editingTask.task);
                            setEditingTask(null);
                          }}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2 ml-auto"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{task.task}</h4>
                            {(task.subtasks || []).length > 0 && (
                              <button
                                onClick={() => setExpandedMasterTasks(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                                className="text-slate-400 hover:text-slate-300 text-xs"
                              >
                                {expandedMasterTasks[task.id] ? '▼' : '▶'} {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                              </button>
                            )}
                          </div>
                          <div className="flex gap-2 text-sm">
                            {task.team && (
                              <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded">
                                {task.team}
                              </span>
                            )}
                            {task.subdivision && (
                              <span className="px-2 py-1 bg-purple-900/50 text-purple-200 rounded">
                                {task.subdivision}
                              </span>
                            )}
                          </div>
                          {task.notes && (
                            <p className="text-sm text-slate-400 mt-2">{task.notes}</p>
                          )}
                        </div>
                        <button
                          onClick={() => setEditingTask({ ...task })}
                          className="text-blue-400 hover:text-blue-300 ml-4"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Sub-tasks */}
                      {expandedMasterTasks[task.id] && (
                        <div className="mt-3 ml-6 space-y-2">
                          {(task.subtasks || []).map(subtask => (
                            <div key={subtask.id} className="flex items-center gap-2">
                              <button
                                onClick={() => toggleSubTaskInMaster(task.id, subtask.id)}
                                className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                                  subtask.completed 
                                    ? 'bg-green-600 border-green-600' 
                                    : 'border-slate-600 hover:border-slate-500'
                                }`}
                              >
                                {subtask.completed && <Check className="w-3 h-3 text-white" />}
                              </button>
                              <span className={`text-sm flex-1 ${subtask.completed ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                                {subtask.text}
                              </span>
                              <button
                                onClick={() => confirmDelete('master-subtask', subtask.id, task.id, subtask.text)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          
                          {/* Add sub-task input */}
                          <div className="flex gap-2 mt-2">
                            <input
                              type="text"
                              placeholder="Add checklist item..."
                              value={newSubTask[task.id] || ''}
                              onChange={(e) => setNewSubTask(prev => ({ ...prev, [task.id]: e.target.value }))}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && newSubTask[task.id]?.trim()) {
                                  addSubTaskToMaster(task.id, newSubTask[task.id]);
                                }
                              }}
                              className="flex-1 px-2 py-1 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none text-sm"
                            />
                            <button
                              onClick={() => {
                                if (newSubTask[task.id]?.trim()) {
                                  addSubTaskToMaster(task.id, newSubTask[task.id]);
                                }
                              }}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Show expand button if no subtasks yet */}
                      {!expandedMasterTasks[task.id] && (
                        <button
                          onClick={() => setExpandedMasterTasks(prev => ({ ...prev, [task.id]: true }))}
                          className="mt-2 text-xs text-blue-400 hover:text-blue-300"
                        >
                          + Add checklist items
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Detail View */}
        {view === 'project-detail' && selectedProject && (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  {/* View Mode Only - Edit moved to project card */}
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{selectedProject.name}</h2>
                    {selectedProject.address && (
                      <p className="text-sm text-slate-400 mb-2">{selectedProject.address}</p>
                    )}
                    <div className="flex flex-wrap gap-2 items-center mb-2">
                      {selectedProject.projectType && (
                        <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded text-xs">
                          {selectedProject.projectType}
                        </span>
                      )}
                      {selectedProject.sqft && (
                        <span className="px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs">
                          {selectedProject.sqft} SQFT
                        </span>
                      )}
                      <select
                        value={selectedProject.status || 'active'}
                        onChange={(e) => updateProjectStatus(selectedProject.id, e.target.value)}
                        className="px-2 py-1 bg-slate-800 text-slate-200 rounded text-xs border border-slate-700 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="active">Active</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  {selectedProject.tasks.filter(t => t.completed).length} / {selectedProject.tasks.length} completed
                  ({getProjectProgress(selectedProject)}%)
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
              <button
                onClick={() => setProjectTab('summary')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                  projectTab === 'summary' 
                    ? 'bg-indigo-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                📊 Summary
              </button>
              <button
                onClick={() => setProjectTab('active')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                  projectTab === 'active' 
                    ? 'bg-blue-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="hidden sm:inline">Active Tasks ({selectedProject.tasks.filter(t => !t.completed).length})</span>
                <span className="sm:hidden">Active ({selectedProject.tasks.filter(t => !t.completed).length})</span>
              </button>
              <button
                onClick={() => {
                  setProjectTab('completed');
                  setExpandedProjectTasks({}); // Reset expansion when switching tabs
                }}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                  projectTab === 'completed' 
                    ? 'bg-green-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="hidden sm:inline">Completed ({selectedProject.tasks.filter(t => t.completed).length})</span>
                <span className="sm:hidden">Done ({selectedProject.tasks.filter(t => t.completed).length})</span>
              </button>
              <button
                onClick={() => setProjectTab('gantt')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                  projectTab === 'gantt' 
                    ? 'bg-teal-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                📊 Gantt
              </button>
              <button
                onClick={() => setProjectTab('schedule')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                  projectTab === 'schedule' 
                    ? 'bg-purple-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                Schedule ({(selectedProject.schedule || []).length})
              </button>
              <button
                onClick={() => setProjectTab('bidschedule')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap ${
                  projectTab === 'bidschedule' 
                    ? 'bg-indigo-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="hidden sm:inline">Bid Schedule ({(selectedProject.bidSchedule || []).length})</span>
                <span className="sm:hidden">Bid ({(selectedProject.bidSchedule || []).length})</span>
              </button>
              <button
                onClick={() => setProjectTab('budget')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base flex items-center gap-1.5 ${
                  projectTab === 'budget' 
                    ? 'bg-emerald-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="text-base sm:text-lg">💵</span>
                Budget
              </button>
              <button
                onClick={() => setProjectTab('costsavings')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap flex items-center gap-1.5 ${
                  projectTab === 'costsavings' 
                    ? 'bg-green-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></span>
                <span className="hidden sm:inline">Cost Savings ({(selectedProject.costSavings || []).length})</span>
                <span className="sm:hidden">Savings ({(selectedProject.costSavings || []).length})</span>
              </button>
              <button
                onClick={() => setProjectTab('changeorders')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base flex items-center gap-1.5 ${
                  projectTab === 'changeorders' 
                    ? 'bg-red-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0"></span>
                Change Orders ({(selectedProject.changeOrders || []).length})
              </button>
              <button
                onClick={() => setProjectTab('submittals')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                  projectTab === 'submittals' 
                    ? 'bg-orange-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                Submittals ({(selectedProject.submittals || []).length})
              </button>
              <button
                onClick={() => setProjectTab('rfis')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                  projectTab === 'rfis' 
                    ? 'bg-yellow-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                RFIs ({(selectedProject.rfis || []).length})
              </button>
              <button
                onClick={() => setProjectTab('permitcomments')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                  projectTab === 'permitcomments' 
                    ? 'bg-purple-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="hidden sm:inline">Permit Comments ({(selectedProject.permitComments || []).length})</span>
                <span className="sm:hidden">Permits ({(selectedProject.permitComments || []).length})</span>
              </button>
              <button
                onClick={() => setProjectTab('meetings')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap ${
                  projectTab === 'meetings' 
                    ? 'bg-teal-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="hidden sm:inline">Meeting Notes ({(selectedProject.meetingNotes || []).length})</span>
                <span className="sm:hidden">Notes ({(selectedProject.meetingNotes || []).length})</span>
              </button>
              <button
                onClick={() => setProjectTab('team')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap ${
                  projectTab === 'team' 
                    ? 'bg-violet-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="hidden sm:inline">👥 Project Team ({(selectedProject.projectTeam || []).length})</span>
                <span className="sm:hidden">Team ({(selectedProject.projectTeam || []).length})</span>
              </button>
              <button
                onClick={() => setProjectTab('floorplans')}
                className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base whitespace-nowrap ${
                  projectTab === 'floorplans' 
                    ? 'bg-indigo-600' 
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <span className="hidden sm:inline">📐 Floor Plans ({(selectedProject.floorPlans || []).length})</span>
                <span className="sm:hidden">Plans ({(selectedProject.floorPlans || []).length})</span>
              </button>
            </div>

            {/* Filters - Only for Active and Completed tabs */}
            {(projectTab === 'active' || projectTab === 'completed') && (
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="flex-1 sm:min-w-[300px] relative">
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none text-base"
                  />
                </div>
                <select
                  value={filterTeam}
                  onChange={(e) => setFilterTeam(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none sm:min-w-[150px]"
                >
                  <option value="all">All Teams</option>
                  {allTeams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
                <select
                  value={filterSubdivision}
                  onChange={(e) => setFilterSubdivision(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none sm:min-w-[180px]"
                >
                  <option value="all">All Subdivisions</option>
                  {allSubdivisions.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Project Summary Tab */}
            {projectTab === 'summary' && (
              <div className="space-y-4">
                {/* Export Summary Button */}
                <button
                  onClick={() => exportToPDF('summary', selectedProject)}
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export Project Summary to PDF
                </button>

                {/* Project Information Card - Collapsible */}
                <div className="bg-slate-900 rounded-lg border border-slate-800">
                  <div 
                    className="p-4 sm:p-6 cursor-pointer hover:bg-slate-800/50 transition-colors"
                    onClick={() => setShowProjectInfo(!showProjectInfo)}
                  >
                    <h3 className="text-lg font-bold flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2">
                        📋 Project Information
                      </span>
                      <span className="text-slate-400 text-sm">
                        {showProjectInfo ? '▼' : '▶'}
                      </span>
                    </h3>
                  </div>
                  {showProjectInfo && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Project Name</p>
                          <p className="font-semibold">{selectedProject.name}</p>
                        </div>
                        {selectedProject.address && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Address</p>
                            <p className="font-semibold">{selectedProject.address}</p>
                          </div>
                        )}
                        {selectedProject.projectType && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Project Type</p>
                            <p className="font-semibold">{selectedProject.projectType}</p>
                          </div>
                        )}
                        {selectedProject.sqft && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Square Footage</p>
                            <p className="font-semibold">{selectedProject.sqft} SQFT</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Status</p>
                          <p className="font-semibold capitalize">{selectedProject.status || 'active'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 mb-1">Created Date</p>
                          <p className="font-semibold">{new Date(selectedProject.createdAt).toLocaleDateString()}</p>
                        </div>
                        {selectedProject.leaseExpiration && (
                          <div>
                            <p className="text-xs text-slate-400 mb-1">⚠️ Lease Expiration</p>
                            <p className="font-semibold">
                              {new Date(selectedProject.leaseExpiration).toLocaleDateString('en-US', { 
                                month: 'long', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                              {(() => {
                                const daysUntilExpiration = Math.ceil((new Date(selectedProject.leaseExpiration) - new Date()) / (1000 * 60 * 60 * 24));
                                const isExpiringSoon = daysUntilExpiration <= 180 && daysUntilExpiration > 0;
                                const isExpired = daysUntilExpiration <= 0;
                                
                                if (isExpired) {
                                  return <span className="ml-2 text-red-400 text-xs font-semibold">(EXPIRED)</span>;
                                } else if (isExpiringSoon) {
                                  return <span className="ml-2 text-yellow-400 text-xs font-semibold">({daysUntilExpiration} days left)</span>;
                                } else {
                                  return <span className="ml-2 text-green-400 text-xs font-semibold">({daysUntilExpiration} days left)</span>;
                                }
                              })()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Budget Summary Card */}
                <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    📊 Budget Summary
                  </h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{selectedProject.name}</span>
                      {(() => {
                        const baselineTotal = getBaselineBudget(selectedProject);
                        const targetTotal = getTargetBudget(selectedProject);
                        const changeOrders = getTotalChangeOrders(selectedProject);
                        const actualTotal = targetTotal + changeOrders;
                        // Variance = Baseline - Actual (positive = under budget)
                        const variance = baselineTotal - actualTotal;
                        const isOverBudget = variance < 0;
                        
                        return (
                          <span className={`text-sm font-semibold ${
                            isOverBudget ? 'text-red-400' : 'text-green-400'
                          }`}>
                            {isOverBudget ? 'Over' : 'Under'} Budget
                          </span>
                        );
                      })()}
                    </div>
                    
                    {(() => {
                      const baselineTotal = getBaselineBudget(selectedProject);
                      const targetTotal = getTargetBudget(selectedProject);
                      const changeOrders = getTotalChangeOrders(selectedProject);
                      const actualTotal = targetTotal + changeOrders;
                      
                      // Calculate percentages
                      const maxBudget = Math.max(baselineTotal, actualTotal);
                      const baselinePercent = maxBudget > 0 ? (baselineTotal / maxBudget) * 100 : 0;
                      const actualPercent = maxBudget > 0 ? (actualTotal / maxBudget) * 100 : 0;
                      
                      return (
                        <div className="relative h-8 bg-slate-800 rounded-lg overflow-hidden">
                          {/* Baseline budget bar (blue) */}
                          <div
                            className="absolute top-0 left-0 h-full bg-blue-600 transition-all"
                            style={{ width: `${baselinePercent}%` }}
                          ></div>
                          
                          {/* Actual budget bar (green - overlays baseline) */}
                          <div
                            className="absolute top-0 left-0 h-full bg-green-600 transition-all"
                            style={{ width: `${actualPercent}%` }}
                          ></div>
                          
                          {/* Budget amount label */}
                          <div className="absolute inset-0 flex items-center justify-end px-3">
                            <span className="text-sm font-bold text-white drop-shadow">
                              {formatBudget(actualTotal.toString())}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                    
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-blue-600 rounded"></div>
                        <span className="text-slate-400">Baseline</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 bg-green-600 rounded"></div>
                        <span className="text-slate-400">Actual</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Milestones Card - Visual Baseline vs Target Comparison */}
                {(selectedProject.schedule || []).length > 0 && (
                  <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      📅 Key Milestones
                    </h3>
                    <div className="space-y-4">
                      {sortScheduleItems(selectedProject.schedule || [])
                        .filter(item => {
                          // Only show the 6 main schedule items
                          const mainItems = [
                            'Funding Approval',
                            'Design Start',
                            'Construction Start',
                            'Substantial Completion',
                            'Handover',
                            'Go Live'
                          ];
                          return mainItems.includes(item.name) && (item.targetStartDate || item.approvedStartDate);
                        })
                        .map(item => {
                          const hasApproved = item.approvedStartDate && item.approvedEndDate;
                          const hasTarget = item.targetStartDate && item.targetEndDate;
                          
                          // Calculate weeks ahead/behind
                          // If target END is BEFORE approved END = ahead (finishing early)
                          // If target END is AFTER approved END = behind (finishing late)
                          let weeksAhead = 0;
                          if (hasApproved && hasTarget) {
                            const approvedEnd = new Date(item.approvedEndDate);
                            const targetEnd = new Date(item.targetEndDate);
                            const diffMs = approvedEnd - targetEnd; // Positive = target finishes before approved = ahead
                            weeksAhead = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
                          }
                          
                          // Calculate timeline visualization
                          let earliestDate, latestDate;
                          if (hasApproved && hasTarget) {
                            const dates = [
                              new Date(item.approvedStartDate),
                              new Date(item.approvedEndDate),
                              new Date(item.targetStartDate),
                              new Date(item.targetEndDate)
                            ];
                            earliestDate = new Date(Math.min(...dates));
                            latestDate = new Date(Math.max(...dates));
                          }
                          
                          const getBarPosition = (startDate, endDate) => {
                            if (!earliestDate || !latestDate) return { left: 0, width: 100 };
                            const totalMs = latestDate - earliestDate;
                            const startMs = new Date(startDate) - earliestDate;
                            const durationMs = new Date(endDate) - new Date(startDate);
                            return {
                              left: (startMs / totalMs) * 100,
                              width: (durationMs / totalMs) * 100
                            };
                          };
                          
                          return (
                            <div key={item.id} className="pb-3 border-b border-slate-800 last:border-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                {hasApproved && hasTarget && weeksAhead !== 0 && (
                                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                                    weeksAhead > 0 ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
                                  }`}>
                                    ⚡ {weeksAhead > 0 ? `${weeksAhead}w` : `${Math.abs(weeksAhead)}w`}
                                  </span>
                                )}
                              </div>
                              
                              {hasTarget && hasApproved ? (
                                <div className="space-y-1.5">
                                  {/* Target Bar */}
                                  <div className="relative">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-green-400 w-14">Target:</span>
                                      <div className="flex-1 relative h-4 bg-slate-800 rounded overflow-hidden">
                                        <div 
                                          className="absolute h-full bg-green-600"
                                          style={{
                                            left: `${getBarPosition(item.targetStartDate, item.targetEndDate).left}%`,
                                            width: `${getBarPosition(item.targetStartDate, item.targetEndDate).width}%`
                                          }}
                                        ></div>
                                      </div>
                                      <span className="text-xs text-slate-400 w-28 text-right">
                                        {formatDateDisplay(item.targetStartDate).split('/')[0]}/{formatDateDisplay(item.targetStartDate).split('/')[1]} - {formatDateDisplay(item.targetEndDate).split('/')[0]}/{formatDateDisplay(item.targetEndDate).split('/')[1]}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  {/* Approved Bar */}
                                  <div className="relative">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-blue-400 w-14">Approved:</span>
                                      <div className="flex-1 relative h-4 bg-slate-800 rounded overflow-hidden">
                                        <div 
                                          className="absolute h-full bg-blue-600"
                                          style={{
                                            left: `${getBarPosition(item.approvedStartDate, item.approvedEndDate).left}%`,
                                            width: `${getBarPosition(item.approvedStartDate, item.approvedEndDate).width}%`
                                          }}
                                        ></div>
                                      </div>
                                      <span className="text-xs text-slate-400 w-28 text-right">
                                        {formatDateDisplay(item.approvedStartDate).split('/')[0]}/{formatDateDisplay(item.approvedStartDate).split('/')[1]} - {formatDateDisplay(item.approvedEndDate).split('/')[0]}/{formatDateDisplay(item.approvedEndDate).split('/')[1]}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ) : hasTarget ? (
                                <div className="text-sm text-slate-400">
                                  Target: {formatDateDisplay(item.targetStartDate)} - {formatDateDisplay(item.targetEndDate)}
                                </div>
                              ) : hasApproved ? (
                                <div className="text-sm text-slate-400">
                                  Approved: {formatDateDisplay(item.approvedStartDate)} - {formatDateDisplay(item.approvedEndDate)}
                                </div>
                              ) : null}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Progress Overview Card */}
                <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    📈 Progress Overview
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-300">Task Completion</span>
                        <span className="font-bold text-blue-400">{getProjectProgress(selectedProject)}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all"
                          style={{ width: `${getProjectProgress(selectedProject)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {selectedProject.tasks.filter(t => t.completed).length} of {selectedProject.tasks.length} tasks completed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financial Summary Card */}
                <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    💰 Financial Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {selectedProject.approvedBudget && (
                      <div className="bg-blue-900/20 rounded-lg p-3 sm:p-4 border border-blue-800">
                        <p className="text-xs text-blue-300 mb-1">Approved Budget</p>
                        <p className="text-xl sm:text-2xl font-bold text-blue-400">
                          {formatBudget(selectedProject.approvedBudget)}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Original approved amount
                        </p>
                      </div>
                    )}
                    <div className="bg-emerald-900/20 rounded-lg p-3 sm:p-4 border border-emerald-800">
                      <p className="text-xs text-emerald-300 mb-1">Total Budget</p>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-400">
                        {formatBudget(getTotalBudget(selectedProject).toString())}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {(selectedProject.budget || []).length} budget items
                      </p>
                    </div>
                    <div className="bg-red-900/20 rounded-lg p-3 sm:p-4 border border-red-800">
                      <p className="text-xs text-red-300 mb-1">Total Change Orders</p>
                      <p className="text-xl sm:text-2xl font-bold text-red-400">
                        {formatBudget(getTotalChangeOrders(selectedProject).toString())}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {(selectedProject.changeOrders || []).length} change orders
                      </p>
                    </div>
                    <div className="bg-green-900/20 rounded-lg p-3 sm:p-4 border border-green-800">
                      <p className="text-xs text-green-300 mb-1">Total Cost Savings</p>
                      <p className="text-xl sm:text-2xl font-bold text-green-400">
                        {formatBudget(getTotalCostSavings(selectedProject).toString())}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {(selectedProject.costSavings || []).length} cost savings
                      </p>
                    </div>
                    <div className="bg-cyan-900/20 rounded-lg p-3 sm:p-4 border border-cyan-800">
                      <p className="text-xs text-cyan-300 mb-1">Current Total</p>
                      <p className="text-xl sm:text-2xl font-bold text-cyan-400">
                        {formatBudget((getTotalBudget(selectedProject) + getTotalChangeOrders(selectedProject)).toString())}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Budget + Change Orders
                      </p>
                    </div>
                    <div className="bg-amber-900/20 rounded-lg p-3 sm:p-4 border border-amber-800">
                      <p className="text-xs text-amber-300 mb-1">Net Project Cost</p>
                      <p className="text-xl sm:text-2xl font-bold text-amber-400">
                        {formatBudget((getTotalBudget(selectedProject) + getTotalChangeOrders(selectedProject) - getTotalCostSavings(selectedProject)).toString())}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Budget + CO - Savings
                      </p>
                    </div>
                    {selectedProject.approvedBudget && (
                      <div className="bg-purple-900/20 rounded-lg p-3 sm:p-4 border border-purple-800">
                        <p className="text-xs text-purple-300 mb-1">vs. Approved Budget</p>
                        <p className="text-xl sm:text-2xl font-bold text-purple-400">
                          {(() => {
                            const approved = parseFloat(selectedProject.approvedBudget) || 0;
                            const current = getTotalBudget(selectedProject) + getTotalChangeOrders(selectedProject);
                            const diff = current - approved;
                            const percent = approved > 0 ? ((diff / approved) * 100).toFixed(1) : '0.0';
                            return `${diff >= 0 ? '+' : ''}${percent}%`;
                          })()}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {(() => {
                            const approved = parseFloat(selectedProject.approvedBudget) || 0;
                            const current = getTotalBudget(selectedProject) + getTotalChangeOrders(selectedProject);
                            const diff = current - approved;
                            return `${diff >= 0 ? '+' : ''}${formatBudget(diff.toString())}`;
                          })()}
                        </p>
                      </div>
                    )}
                    {!selectedProject.approvedBudget && (
                      <div className="bg-purple-900/20 rounded-lg p-3 sm:p-4 border border-purple-800">
                        <p className="text-xs text-purple-300 mb-1">Budget Variance</p>
                        <p className="text-xl sm:text-2xl font-bold text-purple-400">
                          {getTotalChangeOrders(selectedProject) > 0 ? '+' : ''}{getTotalBudget(selectedProject) > 0 ? ((getTotalChangeOrders(selectedProject) / getTotalBudget(selectedProject)) * 100).toFixed(1) : '0.0'}%
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Change vs. Budget
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Activity Card */}
                <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    📊 Project Activity
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-400">
                        {(selectedProject.submittals || []).length}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Submittals</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">
                        {(selectedProject.rfis || []).length}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">RFIs</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">
                        {(selectedProject.changeOrders || []).length}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Change Orders</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">
                        {(selectedProject.permitComments || []).length}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Permit Comments</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-teal-400">
                        {(selectedProject.meetingNotes || []).length}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Meeting Notes</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {(selectedProject.schedule || []).length}
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Schedule Items</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity Timeline (Last 5 items) */}
                <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    🕐 Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {[
                      ...(selectedProject.submittals || []).map(item => ({ ...item, type: 'Submittal', color: 'orange' })),
                      ...(selectedProject.rfis || []).map(item => ({ ...item, type: 'RFI', color: 'yellow' })),
                      ...(selectedProject.changeOrders || []).map(item => ({ ...item, type: 'Change Order', color: 'red' })),
                      ...(selectedProject.permitComments || []).map(item => ({ ...item, type: 'Permit Comment', color: 'purple' })),
                      ...(selectedProject.meetingNotes || []).map(item => ({ ...item, type: 'Meeting Note', color: 'teal', description: item.title }))
                    ]
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                      .slice(0, 10)
                      .map((item, index) => (
                        <div key={`${item.type}-${item.id}`} className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            item.color === 'orange' ? 'bg-orange-400' :
                            item.color === 'yellow' ? 'bg-yellow-400' :
                            item.color === 'red' ? 'bg-red-400' :
                            item.color === 'purple' ? 'bg-purple-400' :
                            'bg-teal-400'
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-medium ${
                                item.color === 'orange' ? 'text-orange-400' :
                                item.color === 'yellow' ? 'text-yellow-400' :
                                item.color === 'red' ? 'text-red-400' :
                                item.color === 'purple' ? 'text-purple-400' :
                                'text-teal-400'
                              }`}>{item.type}</span>
                              <span className="text-xs text-slate-500">
                                {new Date(item.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-slate-300">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    {[
                      ...(selectedProject.submittals || []),
                      ...(selectedProject.rfis || []),
                      ...(selectedProject.changeOrders || []),
                      ...(selectedProject.permitComments || []),
                      ...(selectedProject.meetingNotes || [])
                    ].length === 0 && (
                      <p className="text-sm text-slate-400 text-center py-4">No activity logged yet</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tasks List */}
            <div className="space-y-2">
              {projectTab === 'active' && (
                <>
                  {getFilteredTasks(selectedProject.tasks, false).length === 0 ? (
                    <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400">
                      {searchTerm || filterTeam !== 'all' || filterSubdivision !== 'all'
                        ? 'No active tasks match your filters'
                        : '🎉 All tasks completed!'}
                    </div>
                  ) : (
                    getFilteredTasks(selectedProject.tasks, false).map(task => (
                      <div
                        key={task.id}
                        className="bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
                        onClick={() => setExpandedProjectTasks(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                      >
                        {expandedProjectTasks[task.id] ? (
                          // Expanded View
                          <div>
                            <div className="flex items-start gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTaskCompletion(selectedProject.id, task.id);
                                }}
                                className="mt-1 w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors border-slate-600 hover:border-slate-500"
                              >
                              </button>
                              
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1">{task.task}</h4>
                                <div className="flex gap-2 text-sm mb-2">
                                  {task.team && (
                                    <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded text-xs">
                                      {task.team}
                                    </span>
                                  )}
                                  {task.subdivision && (
                                    <span className="px-2 py-1 bg-purple-900/50 text-purple-200 rounded text-xs">
                                      {task.subdivision}
                                    </span>
                                  )}
                                </div>
                                {task.notes && (
                                  <p className="text-sm text-slate-400 mb-2">{task.notes}</p>
                                )}
                                
                                {/* Sub-tasks display only (read-only) */}
                                {(task.subtasks || []).length > 0 && (
                                  <div className="mt-3 ml-2 space-y-1">
                                    <div className="text-xs text-slate-400 font-medium mb-1">
                                      Checklist: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} completed
                                    </div>
                                    {task.subtasks.map(subtask => (
                                      <div key={subtask.id} className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded border flex items-center justify-center flex-shrink-0 ${
                                          subtask.completed 
                                            ? 'bg-green-600 border-green-600' 
                                            : 'border-slate-600'
                                        }`}>
                                          {subtask.completed && <Check className="w-2 h-2 text-white" />}
                                        </div>
                                        <span className={`text-xs ${subtask.completed ? 'line-through text-slate-500' : 'text-slate-500'}`}>
                                          {subtask.text}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Collapsed View
                          <div>
                            <h4 className="font-semibold mb-1">{task.task}</h4>
                            {task.notes && (
                              <p className="text-sm text-slate-400">{task.notes}</p>
                            )}
                            {(task.subtasks || []).length > 0 && (
                              <div className="text-xs text-slate-400 mt-1">
                                Checklist: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </>
              )}

              {projectTab === 'completed' && (
                <>
                  {getFilteredTasks(selectedProject.tasks, true).length === 0 ? (
                    <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400">
                      {searchTerm || filterTeam !== 'all' || filterSubdivision !== 'all'
                        ? 'No completed tasks match your filters'
                        : 'No tasks completed yet'}
                    </div>
                  ) : (
                    getFilteredTasks(selectedProject.tasks, true).map(task => (
                      <div
                        key={task.id}
                        className="bg-slate-800 rounded-lg p-4 border border-green-700 bg-green-900/20 cursor-pointer transition-colors hover:bg-green-900/30"
                        onClick={() => setExpandedProjectTasks(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                      >
                        {expandedProjectTasks[task.id] ? (
                          // Expanded View
                          <div>
                            <div className="flex items-start gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTaskCompletion(selectedProject.id, task.id);
                                }}
                                className="mt-1 w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors bg-green-600 border-green-600"
                              >
                                <Check className="w-4 h-4 text-white" />
                              </button>
                              
                              <div className="flex-1">
                                <h4 className="font-semibold mb-1 line-through text-slate-400">
                                  {task.task}
                                </h4>
                                <div className="flex gap-2 text-sm mb-2">
                                  {task.team && (
                                    <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded text-xs">
                                      {task.team}
                                    </span>
                                  )}
                                  {task.subdivision && (
                                    <span className="px-2 py-1 bg-purple-900/50 text-purple-200 rounded text-xs">
                                      {task.subdivision}
                                    </span>
                                  )}
                                </div>
                                {task.notes && (
                                  <p className="text-sm text-slate-400 mb-2">{task.notes}</p>
                                )}
                                
                                {/* Sub-tasks display only (read-only) */}
                                {(task.subtasks || []).length > 0 && (
                                  <div className="mt-3 ml-2 space-y-1">
                                    <div className="text-xs text-slate-400 font-medium mb-1">
                                      Checklist: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} completed
                                    </div>
                                    {task.subtasks.map(subtask => (
                                      <div key={subtask.id} className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded border flex items-center justify-center flex-shrink-0 ${
                                          subtask.completed 
                                            ? 'bg-green-600 border-green-600' 
                                            : 'border-slate-600'
                                        }`}>
                                          {subtask.completed && <Check className="w-2 h-2 text-white" />}
                                        </div>
                                        <span className={`text-xs ${subtask.completed ? 'line-through text-slate-500' : 'text-slate-500'}`}>
                                          {subtask.text}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Collapsed View
                          <div>
                            <h4 className="font-semibold mb-1 line-through text-slate-400">
                              {task.task}
                            </h4>
                            {task.notes && (
                              <p className="text-sm text-slate-400">{task.notes}</p>
                            )}
                            {(task.subtasks || []).length > 0 && (
                              <div className="text-xs text-slate-400 mt-1">
                                Checklist: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </>
              )}

              {projectTab === 'schedule' && (
                <div>
                  {/* Add Schedule Item Form */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
                    <h3 className="font-semibold mb-3">Add Schedule Item</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Schedule Item Name *"
                        value={newScheduleItem.name}
                        onChange={(e) => setNewScheduleItem({ ...newScheduleItem, name: e.target.value })}
                        className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="date"
                        placeholder="Start Date"
                        value={newScheduleItem.startDate}
                        onChange={(e) => setNewScheduleItem({ ...newScheduleItem, startDate: e.target.value })}
                        className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="date"
                        placeholder="End Date"
                        value={newScheduleItem.endDate}
                        onChange={(e) => setNewScheduleItem({ ...newScheduleItem, endDate: e.target.value })}
                        className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <button
                      onClick={() => addScheduleItem(selectedProject.id)}
                      className="mt-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      Add to Schedule
                    </button>
                  </div>

                  {/* Schedule Items List */}
                  <div className="space-y-2">
                    {(selectedProject.schedule || []).length === 0 ? (
                      <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400">
                        No schedule items yet. Add your first milestone or deadline above.
                      </div>
                    ) : (
                      sortScheduleItems(selectedProject.schedule || [])
                        .map(item => (
                          <div
                            key={item.id}
                            className={`rounded-lg p-4 border transition-colors ${
                              item.completed 
                                ? 'bg-slate-800 border-slate-700' 
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            {editingScheduleItem?.id === item.id ? (
                              // Edit Mode - Different for key milestones vs post-handover vs regular items
                              (() => {
                                const isKeyMilestone = MILESTONE_ORDER.includes(editingScheduleItem.name);
                                const isPostHandover = ['Site Survey', 'Design Development', 'LOB Awareness', 'Issue for Permit', 'Permit Process', 'MER Freeze #1', 'MER Freeze #2', 'MER Handover to GTI', 'MER Shell Ready', 'MER Room Ready', 'MER Pro. Ready', 'Furniture Install', 'Desktop Install', 'Equipment Delivery'].includes(editingScheduleItem.name);
                                
                                return (
                                  <div>
                                    {isKeyMilestone ? (
                                      // Key Milestone Edit - Approved & Target dates
                                      <div className="space-y-4 mb-3">
                                        <input
                                          type="text"
                                          value={editingScheduleItem.name}
                                          disabled
                                          className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 text-slate-400 cursor-not-allowed"
                                        />
                                        
                                        {/* Approved Schedule */}
                                        <div>
                                          <label className="block text-sm font-medium text-slate-300 mb-2">📋 Approved Schedule (Baseline)</label>
                                          <div className="grid grid-cols-2 gap-3">
                                            <input
                                              type="date"
                                              value={editingScheduleItem.approvedStartDate || ''}
                                              onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, approvedStartDate: e.target.value })}
                                              className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                                            />
                                            <input
                                              type="date"
                                              value={editingScheduleItem.approvedEndDate || ''}
                                              onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, approvedEndDate: e.target.value })}
                                              className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                                            />
                                          </div>
                                        </div>
                                        
                                        {/* Target Schedule */}
                                        <div>
                                          <label className="block text-sm font-medium text-slate-300 mb-2">🎯 Target Schedule (Accelerated)</label>
                                          <div className="grid grid-cols-2 gap-3">
                                            <input
                                              type="date"
                                              value={editingScheduleItem.targetStartDate || ''}
                                              onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, targetStartDate: e.target.value })}
                                              className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                                            />
                                            <input
                                              type="date"
                                              value={editingScheduleItem.targetEndDate || ''}
                                              onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, targetEndDate: e.target.value })}
                                              className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ) : isPostHandover ? (
                                      // Post-Handover Items - Target dates only
                                      <div className="space-y-4 mb-3">
                                        <input
                                          type="text"
                                          value={editingScheduleItem.name}
                                          disabled
                                          className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 text-slate-400 cursor-not-allowed"
                                        />
                                        
                                        {/* Target Dates Only */}
                                        <div>
                                          <label className="block text-sm font-medium text-slate-300 mb-2">🎯 Target Date</label>
                                          <div className="grid grid-cols-2 gap-3">
                                            <div>
                                              <label className="block text-xs text-slate-400 mb-1">Start Date</label>
                                              <input
                                                type="date"
                                                value={editingScheduleItem.targetStartDate || ''}
                                                onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, targetStartDate: e.target.value })}
                                                className="w-full px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                                              />
                                            </div>
                                            <div>
                                              <label className="block text-xs text-slate-400 mb-1">End Date</label>
                                              <input
                                                type="date"
                                                value={editingScheduleItem.targetEndDate || ''}
                                                onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, targetEndDate: e.target.value })}
                                                className="w-full px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      // Regular Schedule Item Edit - Simple start/end dates
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                        <input
                                          type="text"
                                          value={editingScheduleItem.name}
                                          onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, name: e.target.value })}
                                          className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                                        />
                                        <input
                                          type="date"
                                          value={editingScheduleItem.startDate || ''}
                                          onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, startDate: e.target.value })}
                                          className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                                        />
                                        <input
                                          type="date"
                                          value={editingScheduleItem.endDate || ''}
                                          onChange={(e) => setEditingScheduleItem({ ...editingScheduleItem, endDate: e.target.value })}
                                          className="px-4 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none"
                                        />
                                      </div>
                                    )}
                                    
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => updateScheduleItem(selectedProject.id)}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2"
                                      >
                                        <Check className="w-4 h-4" />
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingScheduleItem(null)}
                                        className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded flex items-center gap-2"
                                      >
                                        <X className="w-4 h-4" />
                                        Cancel
                                      </button>
                                      <button
                                        onClick={() => {
                                          confirmDelete('schedule', editingScheduleItem.id, selectedProject.id, editingScheduleItem.name);
                                          setEditingScheduleItem(null);
                                        }}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2 ml-auto"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                );
                              })()
                            ) : (
                              // View Mode - Click to expand/collapse
                              <div
                                className={`cursor-pointer transition-colors ${item.completed ? 'opacity-60' : ''}`}
                                onClick={() => setExpandedScheduleItems(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                              >
                                {expandedScheduleItems[item.id] ? (
                                  // Expanded View with Checkbox
                                  <div className="flex items-start gap-3">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleScheduleItemCompletion(selectedProject.id, item.id);
                                      }}
                                      className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                        item.completed 
                                          ? 'bg-green-600 border-green-600' 
                                          : 'border-slate-600 hover:border-slate-500'
                                      }`}
                                    >
                                      {item.completed && <Check className="w-4 h-4 text-white" />}
                                    </button>
                                    <div className="flex-1">
                                      {(() => {
                                        const isKeyMilestone = MILESTONE_ORDER.includes(item.name);
                                        const isPostHandover = ['Site Survey', 'Design Development', 'LOB Awareness', 'Issue for Permit', 'Permit Process', 'MER Freeze #1', 'MER Freeze #2', 'MER Handover to GTI', 'MER Shell Ready', 'MER Room Ready', 'MER Pro. Ready', 'Furniture Install', 'Desktop Install', 'Equipment Delivery'].includes(item.name);
                                        const hasApproved = item.approvedStartDate && item.approvedEndDate;
                                        const hasTarget = item.targetStartDate && item.targetEndDate;
                                        const hasRegularDates = item.startDate && item.endDate;
                                        
                                        return (
                                          <>
                                            <h4 className={`font-semibold mb-3 ${item.completed ? 'line-through text-slate-500' : ''}`}>
                                              {item.name}
                                            </h4>
                                            
                                            {/* Post-Handover Items - Target Only */}
                                            {isPostHandover && hasTarget && (
                                              <div className="mb-3">
                                                <p className="text-xs font-medium text-slate-400 mb-2">🎯 Target Date:</p>
                                                <div className="flex gap-6 sm:gap-8 text-sm text-slate-300">
                                                  <div>
                                                    <div className="mb-1"><span className="font-medium">Start:</span></div>
                                                    <div>{formatDateDisplay(item.targetStartDate)}</div>
                                                  </div>
                                                  <div>
                                                    <div className="mb-1"><span className="font-medium">End:</span></div>
                                                    <div>{formatDateDisplay(item.targetEndDate)}</div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                            
                                            {/* Key Milestone with Target & Approved */}
                                            {isKeyMilestone && hasTarget && (
                                              <div className="mb-3">
                                                <p className="text-xs font-medium text-slate-400 mb-2">🎯 Target (Accelerated):</p>
                                                <div className="flex gap-6 sm:gap-8 text-sm text-slate-300">
                                                  <div>
                                                    <div className="mb-1"><span className="font-medium">Start:</span></div>
                                                    <div>{formatDateDisplay(item.targetStartDate)}</div>
                                                  </div>
                                                  <div>
                                                    <div className="mb-1"><span className="font-medium">End:</span></div>
                                                    <div>{formatDateDisplay(item.targetEndDate)}</div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                            
                                            {isKeyMilestone && hasApproved && (
                                              <div className="mb-2">
                                                <p className="text-xs font-medium text-slate-400 mb-2">📋 Approved (Baseline):</p>
                                                <div className="flex gap-6 sm:gap-8 text-sm text-slate-300">
                                                  <div>
                                                    <div className="mb-1"><span className="font-medium">Start:</span></div>
                                                    <div>{formatDateDisplay(item.approvedStartDate)}</div>
                                                  </div>
                                                  <div>
                                                    <div className="mb-1"><span className="font-medium">End:</span></div>
                                                    <div>{formatDateDisplay(item.approvedEndDate)}</div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                            
                                            {/* Regular Schedule Item */}
                                            {!isKeyMilestone && !isPostHandover && hasRegularDates && (
                                              <div className="flex gap-6 sm:gap-8 text-sm text-slate-300">
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">Start:</span></div>
                                                  <div>{formatDateDisplay(item.startDate)}</div>
                                                </div>
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">End:</span></div>
                                                  <div>{formatDateDisplay(item.endDate)}</div>
                                                </div>
                                              </div>
                                            )}
                                            
                                            {/* Acceleration Status for Key Milestones */}
                                            {isKeyMilestone && hasApproved && hasTarget && (() => {
                                              const approvedEnd = new Date(item.approvedEndDate);
                                              const targetEnd = new Date(item.targetEndDate);
                                              const diffMs = approvedEnd - targetEnd; // Positive = ahead
                                              const weeksAhead = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
                                              
                                              if (weeksAhead !== 0) {
                                                return (
                                                  <div className={`text-sm mt-2 px-3 py-2 rounded ${
                                                    weeksAhead > 0 ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'
                                                  }`}>
                                                    ⚡ {weeksAhead > 0 
                                                      ? `${weeksAhead} week${weeksAhead !== 1 ? 's' : ''} ahead of approved schedule` 
                                                      : `${Math.abs(weeksAhead)} week${Math.abs(weeksAhead) !== 1 ? 's' : ''} behind approved schedule`
                                                    }
                                                  </div>
                                                );
                                              }
                                            })()}
                                          </>
                                        );
                                      })()}
                                    </div>
                                    <button
                                      onClick={() => setEditingScheduleItem({ ...item })}
                                      className="text-blue-400 hover:text-blue-300 ml-4"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  // Collapsed View - Different display for key milestones vs post-handover vs regular items
                                  (() => {
                                    const isKeyMilestone = MILESTONE_ORDER.includes(item.name);
                                    const isPostHandover = ['Site Survey', 'Design Development', 'LOB Awareness', 'Issue for Permit', 'Permit Process', 'MER Freeze #1', 'MER Freeze #2', 'MER Handover to GTI', 'MER Shell Ready', 'MER Room Ready', 'MER Pro. Ready', 'Furniture Install', 'Desktop Install', 'Equipment Delivery'].includes(item.name);
                                    const hasApproved = item.approvedStartDate && item.approvedEndDate;
                                    const hasTarget = item.targetStartDate && item.targetEndDate;
                                    const hasRegularDates = item.startDate && item.endDate;
                                    
                                    // Calculate weeks ahead/behind for key milestones
                                    // If target END is BEFORE approved END = ahead (finishing early)
                                    // If target END is AFTER approved END = behind (finishing late)
                                    let weeksAhead = 0;
                                    if (isKeyMilestone && hasApproved && hasTarget) {
                                      const approvedEnd = new Date(item.approvedEndDate);
                                      const targetEnd = new Date(item.targetEndDate);
                                      const diffMs = approvedEnd - targetEnd; // Positive = target finishes before approved = ahead
                                      weeksAhead = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
                                    }
                                    
                                    return (
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-2">
                                            <h4 className={`font-semibold ${item.completed ? 'line-through text-slate-500' : ''}`}>
                                              {item.name}
                                            </h4>
                                            {isKeyMilestone && hasApproved && hasTarget && (
                                              <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                                                weeksAhead > 0 ? 'bg-green-900/50 text-green-300' : 
                                                weeksAhead < 0 ? 'bg-red-900/50 text-red-300' :
                                                'bg-blue-900/50 text-blue-300'
                                              }`}>
                                                ⚡ {weeksAhead > 0 ? `${weeksAhead}w ahead` : 
                                                    weeksAhead < 0 ? `${Math.abs(weeksAhead)}w behind` :
                                                    'On track'}
                                              </span>
                                            )}
                                          </div>
                                          <div className="flex gap-6 sm:gap-8 text-sm text-slate-400">
                                            {isPostHandover && hasTarget ? (
                                              <>
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">Start:</span></div>
                                                  <div>{formatDateDisplay(item.targetStartDate)}</div>
                                                </div>
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">End:</span></div>
                                                  <div>{formatDateDisplay(item.targetEndDate)}</div>
                                                </div>
                                              </>
                                            ) : isKeyMilestone && hasTarget ? (
                                              <>
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">Start:</span></div>
                                                  <div>{formatDateDisplay(item.targetStartDate)}</div>
                                                </div>
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">End:</span></div>
                                                  <div>{formatDateDisplay(item.targetEndDate)}</div>
                                                </div>
                                              </>
                                            ) : isKeyMilestone && hasApproved ? (
                                              <>
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">Start:</span></div>
                                                  <div>{formatDateDisplay(item.approvedStartDate)}</div>
                                                </div>
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">End:</span></div>
                                                  <div>{formatDateDisplay(item.approvedEndDate)}</div>
                                                </div>
                                              </>
                                            ) : hasRegularDates ? (
                                              <>
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">Start:</span></div>
                                                  <div>{formatDateDisplay(item.startDate)}</div>
                                                </div>
                                                <div>
                                                  <div className="mb-1"><span className="font-medium">End:</span></div>
                                                  <div>{formatDateDisplay(item.endDate)}</div>
                                                </div>
                                              </>
                                            ) : (
                                              <p className="text-slate-500 italic">Not set</p>
                                            )}
                                          </div>
                                          {isKeyMilestone && hasApproved && hasTarget && (
                                            <p className="text-xs text-slate-500 mt-1">(Click to see baseline schedule)</p>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })()
                                )}
                              </div>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}

              {projectTab === 'gantt' && (
                <div>
                  {/* Export Button */}
                  <button
                    onClick={() => exportToPDF('gantt', selectedProject)}
                    className="w-full sm:w-auto mb-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Gantt to PDF
                  </button>

                  <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800">
                    <h3 className="text-lg font-bold mb-4">Project Gantt Chart</h3>
                    
                    {/* Gantt Chart */}
                    <div className="overflow-x-auto">
                      {(() => {
                        // Get all schedule items with dates (target, approved, or regular)
                        const itemsWithDates = (selectedProject.schedule || []).filter(item => {
                          const isKeyMilestone = MILESTONE_ORDER.includes(item.name);
                          const isPostHandover = ['Site Survey', 'Design Development', 'LOB Awareness', 'Issue for Permit', 'Permit Process', 'MER Freeze #1', 'MER Freeze #2', 'MER Handover to GTI', 'MER Shell Ready', 'MER Room Ready', 'MER Pro. Ready', 'Furniture Install', 'Desktop Install', 'Equipment Delivery'].includes(item.name);
                          
                          if (isKeyMilestone) {
                            return (item.targetStartDate && item.targetEndDate) || (item.approvedStartDate && item.approvedEndDate);
                          } else if (isPostHandover) {
                            return item.targetStartDate && item.targetEndDate;
                          }
                          return item.startDate && item.endDate;
                        });
                        
                        if (itemsWithDates.length === 0) {
                          return (
                            <div className="text-center text-slate-400 py-12">
                              <p className="mb-2">No schedule items with dates yet</p>
                              <p className="text-sm">Add dates to schedule items to see them in the Gantt chart</p>
                            </div>
                          );
                        }
                        
                        return (
                          <div className="min-w-[800px]">
                            {/* Timeline Header */}
                            <div className="mb-6">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="text-sm text-slate-400">
                                  Project Timeline: {(() => {
                                    // Collect all start and end dates
                                    const allDates = [];
                                    itemsWithDates.forEach(item => {
                                      const isKeyMilestone = MILESTONE_ORDER.includes(item.name);
                                      const isPostHandover = ['Site Survey', 'Design Development', 'LOB Awareness', 'Issue for Permit', 'Permit Process', 'MER Freeze #1', 'MER Freeze #2', 'MER Handover to GTI', 'MER Shell Ready', 'MER Room Ready', 'MER Pro. Ready', 'Furniture Install', 'Desktop Install', 'Equipment Delivery'].includes(item.name);
                                      
                                      if (isKeyMilestone) {
                                        if (item.targetStartDate) {
                                          allDates.push(new Date(item.targetStartDate));
                                          allDates.push(new Date(item.targetEndDate));
                                        } else if (item.approvedStartDate) {
                                          allDates.push(new Date(item.approvedStartDate));
                                          allDates.push(new Date(item.approvedEndDate));
                                        }
                                      } else if (isPostHandover) {
                                        if (item.targetStartDate) {
                                          allDates.push(new Date(item.targetStartDate));
                                          allDates.push(new Date(item.targetEndDate));
                                        }
                                      } else {
                                        allDates.push(new Date(item.startDate));
                                        allDates.push(new Date(item.endDate));
                                      }
                                    });
                                    
                                    if (allDates.length === 0) return 'No dates set';
                                    const minDate = new Date(Math.min(...allDates));
                                    const maxDate = new Date(Math.max(...allDates));
                                    return `${minDate.toLocaleDateString()} - ${maxDate.toLocaleDateString()}`;
                                  })()}
                                </div>
                              </div>
                              <div className="text-lg font-bold text-blue-400">
                                Project Duration: {(() => {
                                  const allDates = [];
                                  itemsWithDates.forEach(item => {
                                    const isKeyMilestone = MILESTONE_ORDER.includes(item.name);
                                    const isPostHandover = ['Site Survey', 'Design Development', 'LOB Awareness', 'Issue for Permit', 'Permit Process', 'MER Freeze #1', 'MER Freeze #2', 'MER Handover to GTI', 'MER Shell Ready', 'MER Room Ready', 'MER Pro. Ready', 'Furniture Install', 'Desktop Install', 'Equipment Delivery'].includes(item.name);
                                    
                                    if (isKeyMilestone) {
                                      if (item.targetStartDate) {
                                        allDates.push(new Date(item.targetStartDate));
                                        allDates.push(new Date(item.targetEndDate));
                                      } else if (item.approvedStartDate) {
                                        allDates.push(new Date(item.approvedStartDate));
                                        allDates.push(new Date(item.approvedEndDate));
                                      }
                                    } else if (isPostHandover) {
                                      if (item.targetStartDate) {
                                        allDates.push(new Date(item.targetStartDate));
                                        allDates.push(new Date(item.targetEndDate));
                                      }
                                    } else {
                                      allDates.push(new Date(item.startDate));
                                      allDates.push(new Date(item.endDate));
                                    }
                                  });
                                  
                                  if (allDates.length === 0) return '0 weeks';
                                  const minDate = new Date(Math.min(...allDates));
                                  const maxDate = new Date(Math.max(...allDates));
                                  const totalDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);
                                  const totalWeeks = Math.ceil(totalDays / 7);
                                  return `${totalWeeks} ${totalWeeks === 1 ? 'week' : 'weeks'}`;
                                })()}
                              </div>
                            </div>

                            {/* Gantt Bars */}
                            <div className="space-y-3">
                              {sortScheduleItems(itemsWithDates)
                                .map(item => {
                                  const isKeyMilestone = MILESTONE_ORDER.includes(item.name);
                                  const isPostHandover = ['Site Survey', 'Design Development', 'LOB Awareness', 'Issue for Permit', 'Permit Process', 'MER Freeze #1', 'MER Freeze #2', 'MER Handover to GTI', 'MER Shell Ready', 'MER Room Ready', 'MER Pro. Ready', 'Furniture Install', 'Desktop Install', 'Equipment Delivery'].includes(item.name);
                                  
                                  // Get start/end dates based on item type
                                  let itemStartDate, itemEndDate;
                                  if (isKeyMilestone) {
                                    itemStartDate = item.targetStartDate || item.approvedStartDate;
                                    itemEndDate = item.targetEndDate || item.approvedEndDate;
                                  } else if (isPostHandover) {
                                    itemStartDate = item.targetStartDate;
                                    itemEndDate = item.targetEndDate;
                                  } else {
                                    itemStartDate = item.startDate;
                                    itemEndDate = item.endDate;
                                  }
                                  
                                  // Calculate project timeline bounds
                                  const allDates = [];
                                  itemsWithDates.forEach(schedItem => {
                                    const isKey = MILESTONE_ORDER.includes(schedItem.name);
                                    const isPost = ['Site Survey', 'Design Development', 'LOB Awareness', 'Issue for Permit', 'Permit Process', 'MER Freeze #1', 'MER Freeze #2', 'MER Handover to GTI', 'MER Shell Ready', 'MER Room Ready', 'MER Pro. Ready', 'Furniture Install', 'Desktop Install', 'Equipment Delivery'].includes(schedItem.name);
                                    
                                    if (isKey) {
                                      if (schedItem.targetStartDate) {
                                        allDates.push(new Date(schedItem.targetStartDate));
                                        allDates.push(new Date(schedItem.targetEndDate));
                                      } else if (schedItem.approvedStartDate) {
                                        allDates.push(new Date(schedItem.approvedStartDate));
                                        allDates.push(new Date(schedItem.approvedEndDate));
                                      }
                                    } else if (isPost) {
                                      if (schedItem.targetStartDate) {
                                        allDates.push(new Date(schedItem.targetStartDate));
                                        allDates.push(new Date(schedItem.targetEndDate));
                                      }
                                    } else {
                                      allDates.push(new Date(schedItem.startDate));
                                      allDates.push(new Date(schedItem.endDate));
                                    }
                                  });
                                  
                                  const projectStart = new Date(Math.min(...allDates));
                                  const projectEnd = new Date(Math.max(...allDates));
                                  
                                  const totalDays = Math.max(1, (projectEnd - projectStart) / (1000 * 60 * 60 * 24));
                                  const itemStart = new Date(itemStartDate);
                                  const itemEnd = new Date(itemEndDate);
                                  
                                  const startOffset = ((itemStart - projectStart) / (1000 * 60 * 60 * 24)) / totalDays * 100;
                                  const duration = Math.max(1, (itemEnd - itemStart) / (1000 * 60 * 60 * 24));
                                  const width = (duration / totalDays) * 100;
                                  const weeks = Math.ceil(duration / 7);

                                  return (
                                    <div key={item.id} className="relative">
                                      <div className="flex items-center gap-4">
                                        {/* Task Name */}
                                        <div className="w-48 text-sm font-medium text-slate-300 flex-shrink-0">
                                          {item.name}
                                          {isKeyMilestone && item.targetStartDate && (
                                            <span className="ml-1 text-xs text-green-400">🎯</span>
                                          )}
                                        </div>
                                        
                                        {/* Gantt Bar */}
                                        <div className="flex-1 relative h-10 bg-slate-800/50 rounded">
                                          <div
                                            className={`absolute h-8 top-1 rounded flex items-center justify-center text-xs text-white font-medium shadow-lg ${
                                              isKeyMilestone && item.targetStartDate 
                                                ? 'bg-gradient-to-r from-green-600 to-green-500' 
                                                : 'bg-gradient-to-r from-blue-600 to-blue-500'
                                            }`}
                                            style={{
                                              left: `${startOffset}%`,
                                              width: `${Math.max(width, 2)}%`
                                            }}
                                          >
                                            {width > 10 && (
                                              <span className="px-2">
                                                {weeks} {weeks === 1 ? 'week' : 'weeks'}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        
                                        {/* Duration in Weeks */}
                                        <div className="w-24 text-sm font-medium text-slate-300 flex-shrink-0 text-right">
                                          {weeks} {weeks === 1 ? 'week' : 'weeks'}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="mt-8 pt-4 border-t border-slate-800">
                              <div className="flex items-center gap-6 text-xs text-slate-400">
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-gradient-to-r from-green-600 to-green-500 rounded"></div>
                                  <span>Target Schedule (Key Milestones)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded"></div>
                                  <span>Regular Schedule Items</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {projectTab === 'budget' && (
                <div>
                  {/* Add Budget Item Form */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
                    <h3 className="font-semibold mb-3">Add Budget Item</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <select
                        value={newBudgetItem.category}
                        onChange={(e) => setNewBudgetItem({ ...newBudgetItem, category: e.target.value })}
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Category *</option>
                        {defaultBudgetCategories
                          .filter(cat => !(selectedProject.budget || []).some(item => item.category === cat))
                          .map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        <option value="custom">+ Custom Category</option>
                      </select>
                      
                      {newBudgetItem.category && newBudgetItem.category !== 'custom' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Baseline Cost</label>
                            <input
                              type="text"
                              placeholder="Baseline amount"
                              value={formatBudget(newBudgetItem.baselineCost)}
                              onChange={(e) => {
                                const rawValue = parseBudget(e.target.value);
                                setNewBudgetItem({ ...newBudgetItem, baselineCost: rawValue });
                              }}
                              className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Target Cost</label>
                            <input
                              type="text"
                              placeholder="Target amount"
                              value={formatBudget(newBudgetItem.targetCost)}
                              onChange={(e) => {
                                const rawValue = parseBudget(e.target.value);
                                setNewBudgetItem({ ...newBudgetItem, targetCost: rawValue });
                              }}
                              className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      )}

                      {newBudgetItem.category === 'custom' && (
                        <input
                          type="text"
                          placeholder="Enter custom category name"
                          onChange={(e) => setNewBudgetItem({ ...newBudgetItem, category: e.target.value === '' ? 'custom' : e.target.value })}
                          className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => addBudgetItem(selectedProject.id)}
                      className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2"
                      disabled={newBudgetItem.category === 'custom' || !newBudgetItem.category || (!newBudgetItem.baselineCost && !newBudgetItem.targetCost)}
                    >
                      <Plus className="w-4 h-4" />
                      Add Budget Item
                    </button>
                  </div>

                  {/* Budget Items List */}
                  <div className="space-y-2">
                    {(selectedProject.budget || []).length === 0 ? (
                      <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400">
                        No budget items yet. Add your first cost category above.
                      </div>
                    ) : (
                      <>
                        {(selectedProject.budget || []).map(item => (
                          <div
                            key={item.id}
                            className="bg-slate-900 rounded-lg p-3 border border-slate-800 hover:border-slate-700"
                          >
                            {editingBudgetItem?.id === item.id ? (
                              // Edit Mode
                              <div>
                                <div className="grid grid-cols-1 gap-3 mb-3">
                                  <input
                                    type="text"
                                    value={editingBudgetItem.category}
                                    onChange={(e) => setEditingBudgetItem({ ...editingBudgetItem, category: e.target.value })}
                                    className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                  />
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                      <label className="block text-xs text-slate-400 mb-1">Baseline Cost</label>
                                      <input
                                        type="text"
                                        value={formatBudget(editingBudgetItem.baselineCost || editingBudgetItem.amount || '')}
                                        onChange={(e) => {
                                          const rawValue = parseBudget(e.target.value);
                                          setEditingBudgetItem({ ...editingBudgetItem, baselineCost: rawValue });
                                        }}
                                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs text-slate-400 mb-1">Target Cost</label>
                                      <input
                                        type="text"
                                        value={formatBudget(editingBudgetItem.targetCost || editingBudgetItem.amount || '')}
                                        onChange={(e) => {
                                          const rawValue = parseBudget(e.target.value);
                                          setEditingBudgetItem({ ...editingBudgetItem, targetCost: rawValue });
                                        }}
                                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateBudgetItem(selectedProject.id)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2"
                                  >
                                    <Check className="w-4 h-4" />
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingBudgetItem(null)}
                                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded flex items-center gap-2"
                                  >
                                    <X className="w-4 h-4" />
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => {
                                      confirmDelete('budget', editingBudgetItem.id, selectedProject.id, editingBudgetItem.category);
                                    }}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2 ml-auto"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // View Mode
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm mb-2">{item.category}</h4>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <div className="text-xs text-slate-400">Baseline</div>
                                      <div className="text-lg font-semibold text-blue-400">
                                        {formatBudget((item.baselineCost || item.amount || '0').toString())}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs text-slate-400">Target</div>
                                      <div className="text-lg font-semibold text-green-400">
                                        {formatBudget((item.targetCost || item.amount || '0').toString())}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setEditingBudgetItem({ ...item })}
                                  className="text-blue-400 hover:text-blue-300 ml-4"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Budget Summary */}
                        <div className="space-y-3 mt-4">
                          {/* Baseline Budget Total */}
                          <div className="bg-blue-900/30 rounded-lg p-3 border-2 border-blue-700">
                            <div className="flex items-center justify-between">
                              <h3 className="text-base sm:text-lg font-bold">Baseline Budget</h3>
                              <div className="text-xl sm:text-2xl font-bold text-blue-400">
                                {formatBudget(getBaselineBudget(selectedProject).toString())}
                              </div>
                            </div>
                          </div>

                          {/* Target Budget Total */}
                          <div className="bg-green-900/30 rounded-lg p-3 border-2 border-green-700">
                            <div className="flex items-center justify-between">
                              <h3 className="text-base sm:text-lg font-bold">Target Budget</h3>
                              <div className="text-xl sm:text-2xl font-bold text-green-400">
                                {formatBudget(getTargetBudget(selectedProject).toString())}
                              </div>
                            </div>
                          </div>

                          {/* Change Orders Total */}
                          {(selectedProject.changeOrders || []).length > 0 && (
                            <div className="bg-orange-900/30 rounded-lg p-3 border-2 border-orange-700">
                              <div className="flex items-center justify-between">
                                <h3 className="text-base sm:text-lg font-bold">Change Orders</h3>
                                <div className="text-xl sm:text-2xl font-bold text-orange-400">
                                  {formatBudget(getTotalChangeOrders(selectedProject).toString())}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Variance (Baseline vs Target + Change Orders) */}
                          {(() => {
                            const baselineTotal = getBaselineBudget(selectedProject);
                            const targetTotal = getTargetBudget(selectedProject);
                            const changeOrders = getTotalChangeOrders(selectedProject);
                            // Variance = Baseline - (Target + Change Orders)
                            // Positive = Under Budget (savings), Negative = Over Budget
                            const variance = baselineTotal - (targetTotal + changeOrders);
                            const isOverBudget = variance < 0;
                            
                            return (
                              <div className={`rounded-lg p-3 border-2 ${
                                isOverBudget 
                                  ? 'bg-red-900/30 border-red-700' 
                                  : 'bg-emerald-900/30 border-emerald-700'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="text-base sm:text-lg font-bold">Variance</h3>
                                    <p className="text-xs text-slate-400">
                                      Baseline vs (Target + Change Orders)
                                    </p>
                                  </div>
                                  <div className={`text-xl sm:text-2xl font-bold ${
                                    isOverBudget ? 'text-red-400' : 'text-emerald-400'
                                  }`}>
                                    {isOverBudget ? '-' : '+'}{formatBudget(Math.abs(variance).toString())}
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </div>

                        {/* Visual Budget Summary Chart */}
                        <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800 mt-6">
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            📊 Budget Summary
                          </h3>
                          
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">{selectedProject.name}</span>
                              {(() => {
                                const baselineTotal = getBaselineBudget(selectedProject);
                                const targetTotal = getTargetBudget(selectedProject);
                                const changeOrders = getTotalChangeOrders(selectedProject);
                                const actualTotal = targetTotal + changeOrders;
                                // Variance = Baseline - Actual (positive = under budget)
                                const variance = baselineTotal - actualTotal;
                                const isOverBudget = variance < 0;
                                
                                return (
                                  <span className={`text-sm font-semibold ${
                                    isOverBudget ? 'text-red-400' : 'text-green-400'
                                  }`}>
                                    {isOverBudget ? 'Over' : 'Under'} Budget
                                  </span>
                                );
                              })()}
                            </div>
                            
                            {(() => {
                              const baselineTotal = getBaselineBudget(selectedProject);
                              const targetTotal = getTargetBudget(selectedProject);
                              const changeOrders = getTotalChangeOrders(selectedProject);
                              const actualTotal = targetTotal + changeOrders;
                              
                              // Calculate percentages
                              const maxBudget = Math.max(baselineTotal, actualTotal);
                              const baselinePercent = maxBudget > 0 ? (baselineTotal / maxBudget) * 100 : 0;
                              const actualPercent = maxBudget > 0 ? (actualTotal / maxBudget) * 100 : 0;
                              
                              return (
                                <div className="relative h-8 bg-slate-800 rounded-lg overflow-hidden">
                                  {/* Baseline budget bar (blue) */}
                                  <div
                                    className="absolute top-0 left-0 h-full bg-blue-600 transition-all"
                                    style={{ width: `${baselinePercent}%` }}
                                  ></div>
                                  
                                  {/* Actual budget bar (green - overlays baseline) */}
                                  <div
                                    className="absolute top-0 left-0 h-full bg-green-600 transition-all"
                                    style={{ width: `${actualPercent}%` }}
                                  ></div>
                                  
                                  {/* Budget amount label */}
                                  <div className="absolute inset-0 flex items-center justify-end px-3">
                                    <span className="text-sm font-bold text-white drop-shadow">
                                      {formatBudget(actualTotal.toString())}
                                    </span>
                                  </div>
                                </div>
                              );
                            })()}
                            
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                                <span className="text-slate-400">Baseline</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-green-600 rounded"></div>
                                <span className="text-slate-400">Actual</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              {/* Cost Savings Tab */}
              {projectTab === 'costsavings' && (
                <div>
                  {/* Add Cost Saving Form */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
                    <h3 className="font-semibold mb-3">Add Cost Saving</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Description of cost saving *"
                        value={newCostSaving.description}
                        onChange={(e) => setNewCostSaving({ ...newCostSaving, description: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Savings Amount (e.g., 5000) *"
                        value={newCostSaving.amount}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.]/g, '');
                          setNewCostSaving({ ...newCostSaving, amount: value });
                        }}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                      {newCostSaving.amount && (
                        <p className="text-sm text-green-400">
                          ${parseFloat(newCostSaving.amount).toLocaleString()}
                        </p>
                      )}
                      <textarea
                        placeholder="Notes (optional)"
                        value={newCostSaving.notes}
                        onChange={(e) => setNewCostSaving({ ...newCostSaving, notes: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none resize-none"
                        rows="3"
                      />
                      <button
                        onClick={() => addCostSaving(selectedProject.id)}
                        disabled={!newCostSaving.description.trim() || !newCostSaving.amount}
                        className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Cost Saving
                      </button>
                    </div>
                  </div>

                  {/* Cost Savings List */}
                  <div className="space-y-4">
                    {(selectedProject.costSavings || []).length === 0 ? (
                      <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400 border border-slate-800">
                        No cost savings recorded yet. Add your first cost saving above.
                      </div>
                    ) : (
                      <>
                        {(selectedProject.costSavings || [])
                          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                          .map(saving => (
                            editingCostSaving?.id === saving.id ? (
                              // Edit Mode
                              <div key={saving.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-slate-700 rounded text-sm font-semibold">
                                      CS#{editingCostSaving.number || '001'}
                                    </span>
                                    <input
                                      type="text"
                                      value={editingCostSaving.amount}
                                      onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9.]/g, '');
                                        setEditingCostSaving({ ...editingCostSaving, amount: value });
                                      }}
                                      className="text-lg font-bold text-green-400 bg-slate-800 px-3 py-1 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                      placeholder="Amount"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => updateCostSaving(selectedProject.id)}
                                      className="p-2 text-green-400 hover:text-green-300 hover:bg-slate-800 rounded"
                                      title="Save"
                                    >
                                      <Check className="w-5 h-5" />
                                    </button>
                                    <button
                                      onClick={() => setEditingCostSaving(null)}
                                      className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-800 rounded"
                                      title="Cancel"
                                    >
                                      <X className="w-5 h-5" />
                                    </button>
                                  </div>
                                </div>

                                <input
                                  type="text"
                                  value={editingCostSaving.description}
                                  onChange={(e) => setEditingCostSaving({ ...editingCostSaving, description: e.target.value })}
                                  className="text-sm font-semibold mb-3 bg-slate-800 px-3 py-2 rounded border border-slate-700 focus:border-blue-500 focus:outline-none w-full"
                                  placeholder="Description"
                                />

                                <div className="bg-slate-800 rounded-lg p-4">
                                  <p className="text-sm text-slate-400 mb-2">Notes:</p>
                                  <textarea
                                    value={editingCostSaving.notes}
                                    onChange={(e) => setEditingCostSaving({ ...editingCostSaving, notes: e.target.value })}
                                    className="w-full bg-slate-700 px-3 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none resize-none"
                                    rows="3"
                                    placeholder="Additional notes..."
                                  />
                                </div>

                                <p className="text-sm text-slate-500 mt-4">
                                  {new Date(saving.timestamp).toLocaleString()}
                                </p>
                              </div>
                            ) : (
                              // View Mode
                              <div key={saving.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800 hover:border-slate-700 transition-colors">
                                <div 
                                  className="flex items-start justify-between cursor-pointer"
                                  onClick={() => toggleCostSaving(saving.id)}
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 flex-wrap mb-2">
                                      <span className="px-3 py-1 bg-slate-700 rounded text-sm font-semibold">
                                        CS#{saving.number || '001'}
                                      </span>
                                      <span className="text-lg font-bold text-green-400">
                                        ${parseFloat(saving.amount).toLocaleString()}
                                      </span>
                                    </div>
                                    <h4 className="text-sm font-semibold mb-2">{saving.description}</h4>
                                  </div>
                                  <div className="flex items-center gap-2 ml-4">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingCostSaving({ ...saving });
                                      }}
                                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-800 rounded"
                                      title="Edit"
                                    >
                                      <Edit2 className="w-5 h-5" />
                                    </button>
                                    {expandedCostSavings[saving.id] ? (
                                      <ChevronUp className="w-5 h-5 text-slate-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-slate-400" />
                                    )}
                                  </div>
                                </div>

                                {expandedCostSavings[saving.id] && (
                                  <div className="mt-3 pt-3 border-t border-slate-800">
                                    {saving.notes && (
                                      <div className="bg-slate-800 rounded-lg p-3 mb-3">
                                        <p className="text-xs text-slate-400 mb-1 font-medium">Notes:</p>
                                        <p className="text-sm text-slate-300 whitespace-pre-wrap">{saving.notes}</p>
                                      </div>
                                    )}
                                    <p className="text-sm text-slate-500">
                                      {new Date(saving.timestamp).toLocaleString()}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )
                          ))}

                        {/* Total Cost Savings */}
                        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-3 border-2 border-green-800">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-bold">Total Cost Savings</h3>
                            <p className="text-xl sm:text-2xl font-bold text-green-400">
                              ${getTotalCostSavings(selectedProject).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {projectTab === 'submittals' && (
                <div>
                  {/* Export Button */}
                  <button
                    onClick={() => exportToPDF('submittals', selectedProject)}
                    className="w-full sm:w-auto mb-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Submittals to PDF
                  </button>

                  {/* Add Submittal Form */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
                    <h3 className="font-semibold mb-3">Add Submittal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select
                        value={newSubmittal.type}
                        onChange={(e) => setNewSubmittal({ ...newSubmittal, type: e.target.value })}
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Submittal Type *</option>
                        {submittalTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Description *"
                        value={newSubmittal.description}
                        onChange={(e) => setNewSubmittal({ ...newSubmittal, description: e.target.value })}
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <textarea
                      placeholder="Notes (Additional context or details)"
                      value={newSubmittal.notes}
                      onChange={(e) => setNewSubmittal({ ...newSubmittal, notes: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mt-3 resize-none"
                      rows="3"
                    />
                    <button
                      onClick={() => addSubmittal(selectedProject.id)}
                      className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Submittal
                    </button>
                  </div>

                  {/* Submittals List */}
                  <div className="space-y-2">
                    {(selectedProject.submittals || []).length === 0 ? (
                      <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400">
                        No submittals logged yet. Add your first submittal above.
                      </div>
                    ) : (
                      (selectedProject.submittals || [])
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map(item => (
                          <div
                            key={item.id}
                            className="bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700"
                          >
                            {editingSubmittal?.id === item.id ? (
                              // Edit Mode
                              <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                  <select
                                    value={editingSubmittal.type}
                                    onChange={(e) => setEditingSubmittal({ ...editingSubmittal, type: e.target.value })}
                                    className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                  >
                                    <option value="">Select Type</option>
                                    {submittalTypes.map(type => (
                                      <option key={type} value={type}>{type}</option>
                                    ))}
                                  </select>
                                  <input
                                    type="text"
                                    value={editingSubmittal.description}
                                    onChange={(e) => setEditingSubmittal({ ...editingSubmittal, description: e.target.value })}
                                    className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                    placeholder="Description"
                                  />
                                </div>
                                <textarea
                                  placeholder="Notes"
                                  value={editingSubmittal.notes || ''}
                                  onChange={(e) => setEditingSubmittal({ ...editingSubmittal, notes: e.target.value })}
                                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mb-3 resize-none"
                                  rows="3"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateSubmittal(selectedProject.id)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2"
                                  >
                                    <Check className="w-4 h-4" />
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingSubmittal(null)}
                                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded flex items-center gap-2"
                                  >
                                    <X className="w-4 h-4" />
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => {
                                      confirmDelete('submittal', editingSubmittal.id, selectedProject.id, editingSubmittal.description);
                                    }}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2 ml-auto"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // View Mode
                              <div 
                                className="cursor-pointer"
                                onClick={() => toggleSubmittal(item.id)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs font-bold">
                                        #{item.number}
                                      </span>
                                      <span className="px-2 py-1 bg-orange-900/50 text-orange-200 rounded text-xs font-medium">
                                        {item.type}
                                      </span>
                                    </div>
                                    <p className="text-sm text-slate-300">{item.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 ml-4">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingSubmittal({ ...item });
                                      }}
                                      className="text-blue-400 hover:text-blue-300"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    {expandedSubmittals[item.id] ? (
                                      <ChevronUp className="w-5 h-5 text-slate-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-slate-400" />
                                    )}
                                  </div>
                                </div>

                                {expandedSubmittals[item.id] && (
                                  <div className="mt-3 pt-3 border-t border-slate-800">
                                    {item.notes && (
                                      <div className="bg-slate-800/50 rounded px-3 py-2 mb-2">
                                        <p className="text-xs text-slate-400 mb-1 font-medium">Notes:</p>
                                        <p className="text-sm text-slate-300 whitespace-pre-wrap">{item.notes}</p>
                                      </div>
                                    )}
                                    <span className="text-xs text-slate-500">
                                      {new Date(item.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}

              {projectTab === 'rfis' && (
                <div>
                  {/* Export Button */}
                  <button
                    onClick={() => exportToPDF('rfis', selectedProject)}
                    className="w-full sm:w-auto mb-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export RFIs to PDF
                  </button>

                  {/* Add RFI Form */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
                    <h3 className="font-semibold mb-3">Add RFI</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="RFI Description *"
                        value={newRFI.description}
                        onChange={(e) => setNewRFI({ ...newRFI, description: e.target.value })}
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                      <select
                        value={newRFI.responsibleTeam}
                        onChange={(e) => setNewRFI({ ...newRFI, responsibleTeam: e.target.value })}
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Responsible Team *</option>
                        {allTeams.map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      placeholder="Notes (Additional context or details)"
                      value={newRFI.notes}
                      onChange={(e) => setNewRFI({ ...newRFI, notes: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mt-3 resize-none"
                      rows="3"
                    />
                    <button
                      onClick={() => addRFI(selectedProject.id)}
                      className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add RFI
                    </button>
                  </div>


                  {/* RFIs List */}
                  <div className="space-y-2">
                    {(selectedProject.rfis || []).length === 0 ? (
                      <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400">
                        No RFIs logged yet. Add your first RFI above.
                      </div>
                    ) : (
                      (selectedProject.rfis || [])
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map(item => (
                          <div
                            key={item.id}
                            className="bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700"
                          >
                            {editingRFI?.id === item.id ? (
                              // Edit Mode
                              <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                  <input
                                    type="text"
                                    value={editingRFI.description}
                                    onChange={(e) => setEditingRFI({ ...editingRFI, description: e.target.value })}
                                    className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                    placeholder="Description"
                                  />
                                  <select
                                    value={editingRFI.responsibleTeam}
                                    onChange={(e) => setEditingRFI({ ...editingRFI, responsibleTeam: e.target.value })}
                                    className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                  >
                                    <option value="">Select Team</option>
                                    {allTeams.map(team => (
                                      <option key={team} value={team}>{team}</option>
                                    ))}
                                  </select>
                                </div>
                                <textarea
                                  placeholder="Notes"
                                  value={editingRFI.notes || ''}
                                  onChange={(e) => setEditingRFI({ ...editingRFI, notes: e.target.value })}
                                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mb-3 resize-none"
                                  rows="3"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateRFI(selectedProject.id)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2"
                                  >
                                    <Check className="w-4 h-4" />
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingRFI(null)}
                                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded flex items-center gap-2"
                                  >
                                    <X className="w-4 h-4" />
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => {
                                      confirmDelete('rfi', editingRFI.id, selectedProject.id, editingRFI.description);
                                    }}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2 ml-auto"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // View Mode
                              <div 
                                className="cursor-pointer"
                                onClick={() => toggleRFI(item.id)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs font-bold">
                                        #{item.number}
                                      </span>
                                      <span className="px-2 py-1 bg-yellow-900/50 text-yellow-200 rounded text-xs font-medium">
                                        {item.responsibleTeam}
                                      </span>
                                    </div>
                                    <p className="text-sm text-slate-300">{item.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 ml-4">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingRFI({ ...item });
                                      }}
                                      className="text-blue-400 hover:text-blue-300"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    {expandedRFIs[item.id] ? (
                                      <ChevronUp className="w-5 h-5 text-slate-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-slate-400" />
                                    )}
                                  </div>
                                </div>

                                {expandedRFIs[item.id] && (
                                  <div className="mt-3 pt-3 border-t border-slate-800">
                                    {item.notes && (
                                      <div className="bg-slate-800/50 rounded px-3 py-2 mb-2">
                                        <p className="text-xs text-slate-400 mb-1 font-medium">Notes:</p>
                                        <p className="text-sm text-slate-300 whitespace-pre-wrap">{item.notes}</p>
                                      </div>
                                    )}
                                    <span className="text-xs text-slate-500">
                                      {new Date(item.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}

              {projectTab === 'changeorders' && (
                <div>
                  {/* Export Button */}
                  <button
                    onClick={() => exportToPDF('changeorders', selectedProject)}
                    className="w-full sm:w-auto mb-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Change Orders to PDF
                  </button>

                  {/* Add Change Order Form */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
                    <h3 className="font-semibold mb-3">Add Change Order</h3>
                    
                    {/* Requested By Dropdown */}
                    <div className="mb-3">
                      <select
                        value={newChangeOrder.requestedBy}
                        onChange={(e) => setNewChangeOrder({ ...newChangeOrder, requestedBy: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Requested By *</option>
                        {allTeams.map(team => (
                          <option key={team} value={team}>{team}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Change Order Description *"
                        value={newChangeOrder.description}
                        onChange={(e) => setNewChangeOrder({ ...newChangeOrder, description: e.target.value })}
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Amount *"
                        value={formatBudget(newChangeOrder.amount)}
                        onChange={(e) => {
                          const rawValue = parseBudget(e.target.value);
                          setNewChangeOrder({ ...newChangeOrder, amount: rawValue });
                        }}
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <textarea
                      placeholder="Notes (Why was this change order needed?)"
                      value={newChangeOrder.notes}
                      onChange={(e) => setNewChangeOrder({ ...newChangeOrder, notes: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mt-3 resize-none"
                      rows="3"
                    />
                    <button
                      onClick={() => addChangeOrder(selectedProject.id)}
                      className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Change Order
                    </button>
                  </div>

                  {/* Change Orders List */}
                  <div className="space-y-2">
                    {(selectedProject.changeOrders || []).length === 0 ? (
                      <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400">
                        No change orders logged yet. Add your first change order above.
                      </div>
                    ) : (
                      <>
                        {(selectedProject.changeOrders || [])
                          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                          .map(item => (
                            <div
                              key={item.id}
                              className="bg-slate-900 rounded-lg p-3 border border-slate-800 hover:border-slate-700"
                            >
                              {editingChangeOrder?.id === item.id ? (
                                // Edit Mode
                                <div>
                                  {/* Requested By Dropdown */}
                                  <div className="mb-3">
                                    <select
                                      value={editingChangeOrder.requestedBy || ''}
                                      onChange={(e) => setEditingChangeOrder({ ...editingChangeOrder, requestedBy: e.target.value })}
                                      className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                    >
                                      <option value="">Requested By</option>
                                      {allTeams.map(team => (
                                        <option key={team} value={team}>{team}</option>
                                      ))}
                                    </select>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <input
                                      type="text"
                                      value={editingChangeOrder.description}
                                      onChange={(e) => setEditingChangeOrder({ ...editingChangeOrder, description: e.target.value })}
                                      className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                      placeholder="Description"
                                    />
                                    <input
                                      type="text"
                                      value={formatBudget(editingChangeOrder.amount)}
                                      onChange={(e) => {
                                        const rawValue = parseBudget(e.target.value);
                                        setEditingChangeOrder({ ...editingChangeOrder, amount: rawValue });
                                      }}
                                      className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                    />
                                  </div>
                                  <textarea
                                    placeholder="Notes"
                                    value={editingChangeOrder.notes || ''}
                                    onChange={(e) => setEditingChangeOrder({ ...editingChangeOrder, notes: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mb-3 resize-none"
                                    rows="3"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => updateChangeOrder(selectedProject.id)}
                                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2"
                                    >
                                      <Check className="w-4 h-4" />
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingChangeOrder(null)}
                                      className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded flex items-center gap-2"
                                    >
                                      <X className="w-4 h-4" />
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() => {
                                        confirmDelete('changeorder', editingChangeOrder.id, selectedProject.id, editingChangeOrder.description);
                                      }}
                                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2 ml-auto"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                // View Mode
                                <div 
                                  className="cursor-pointer"
                                  onClick={() => toggleChangeOrder(item.id)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs font-bold">
                                          {item.number}
                                        </span>
                                        <span className="text-lg font-semibold text-red-400">
                                          {formatBudget(item.amount)}
                                        </span>
                                        {item.requestedBy && (
                                          <span className="px-2 py-0.5 bg-blue-900/50 text-blue-300 rounded text-xs">
                                            {item.requestedBy}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-sm text-slate-300">{item.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingChangeOrder({ ...item });
                                        }}
                                        className="text-blue-400 hover:text-blue-300"
                                      >
                                        <Edit2 className="w-4 h-4" />
                                      </button>
                                      {expandedChangeOrders[item.id] ? (
                                        <ChevronUp className="w-5 h-5 text-slate-400" />
                                      ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                      )}
                                    </div>
                                  </div>

                                  {expandedChangeOrders[item.id] && (
                                    <div className="mt-3 pt-3 border-t border-slate-800">
                                      {item.notes && (
                                        <div className="bg-slate-800/50 rounded px-3 py-2 mb-2">
                                          <p className="text-xs text-slate-400 mb-1 font-medium">Notes:</p>
                                          <p className="text-sm text-slate-300 whitespace-pre-wrap">{item.notes}</p>
                                        </div>
                                      )}
                                      <span className="text-xs text-slate-500">
                                        {new Date(item.timestamp).toLocaleString()}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        
                        {/* Total Change Orders */}
                        <div className="bg-red-900/30 rounded-lg p-3 border-2 border-red-700 mt-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-bold">Total Change Orders</h3>
                            <div className="text-xl sm:text-2xl font-bold text-red-400">
                              {formatBudget(getTotalChangeOrders(selectedProject).toString())}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {projectTab === 'permitcomments' && (
                <div>
                  {/* Export Button */}
                  <button
                    onClick={() => exportToPDF('permits', selectedProject)}
                    className="w-full sm:w-auto mb-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Permit Comments to PDF
                  </button>

                  {/* Add Permit Comment Form */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
                    <h3 className="font-semibold mb-3">Add Permit Comment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Comment Description *"
                        value={newPermitComment.description}
                        onChange={(e) => setNewPermitComment({ ...newPermitComment, description: e.target.value })}
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                      <select
                        value={newPermitComment.commentType}
                        onChange={(e) => setNewPermitComment({ ...newPermitComment, commentType: e.target.value })}
                        className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select Comment Type *</option>
                        <option value="Zoning">Zoning</option>
                        <option value="Historical Board">Historical Board</option>
                        <option value="Building">Building</option>
                        <option value="Fire">Fire</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Structural">Structural</option>
                      </select>
                    </div>
                    <textarea
                      placeholder="Notes (Additional context or details)"
                      value={newPermitComment.notes}
                      onChange={(e) => setNewPermitComment({ ...newPermitComment, notes: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mt-3 resize-none"
                      rows="3"
                    />
                    <button
                      onClick={() => addPermitComment(selectedProject.id)}
                      className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Permit Comment
                    </button>
                  </div>


                  {/* Permit Comments List */}
                  <div className="space-y-2">
                    {(selectedProject.permitComments || []).length === 0 ? (
                      <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400">
                        No permit comments logged yet. Add your first permit comment above.
                      </div>
                    ) : (
                      (selectedProject.permitComments || [])
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map(item => (
                          <div
                            key={item.id}
                            className="bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700"
                          >
                            {editingPermitComment?.id === item.id ? (
                              // Edit Mode
                              <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                  <input
                                    type="text"
                                    value={editingPermitComment.description}
                                    onChange={(e) => setEditingPermitComment({ ...editingPermitComment, description: e.target.value })}
                                    className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                    placeholder="Description"
                                  />
                                  <select
                                    value={editingPermitComment.commentType}
                                    onChange={(e) => setEditingPermitComment({ ...editingPermitComment, commentType: e.target.value })}
                                    className="px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                                  >
                                    <option value="">Select Type</option>
                                    <option value="Zoning">Zoning</option>
                                    <option value="Historical Board">Historical Board</option>
                                    <option value="Building">Building</option>
                                    <option value="Fire">Fire</option>
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Structural">Structural</option>
                                  </select>
                                </div>
                                <textarea
                                  placeholder="Notes"
                                  value={editingPermitComment.notes || ''}
                                  onChange={(e) => setEditingPermitComment({ ...editingPermitComment, notes: e.target.value })}
                                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mb-3 resize-none"
                                  rows="3"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updatePermitComment(selectedProject.id)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2"
                                  >
                                    <Check className="w-4 h-4" />
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingPermitComment(null)}
                                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded flex items-center gap-2"
                                  >
                                    <X className="w-4 h-4" />
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // View Mode
                              <div 
                                className="cursor-pointer"
                                onClick={() => togglePermitComment(item.id)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="px-2 py-1 bg-slate-700 text-slate-200 rounded text-xs font-bold">
                                        #{item.number}
                                      </span>
                                      <span className="px-2 py-1 bg-purple-900/50 text-purple-200 rounded text-xs font-medium">
                                        {item.commentType}
                                      </span>
                                    </div>
                                    <p className="text-sm text-slate-300">{item.description}</p>
                                  </div>
                                  <div className="flex items-center gap-2 ml-4">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingPermitComment({ ...item });
                                      }}
                                      className="text-blue-400 hover:text-blue-300"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        confirmDelete('permit', item.id, selectedProject.id, item.description);
                                      }}
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                    {expandedPermitComments[item.id] ? (
                                      <ChevronUp className="w-5 h-5 text-slate-400" />
                                    ) : (
                                      <ChevronDown className="w-5 h-5 text-slate-400" />
                                    )}
                                  </div>
                                </div>

                                {expandedPermitComments[item.id] && (
                                  <div className="mt-3 pt-3 border-t border-slate-800">
                                    {item.notes && (
                                      <div className="bg-slate-800/50 rounded px-3 py-2 mb-2">
                                        <p className="text-xs text-slate-400 mb-1 font-medium">Notes:</p>
                                        <p className="text-sm text-slate-300 whitespace-pre-wrap">{item.notes}</p>
                                      </div>
                                    )}
                                    <span className="text-xs text-slate-500">
                                      {new Date(item.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}

              {/* Bid Schedule Tab */}
              {projectTab === 'bidschedule' && (
                <div className="flex flex-col h-full">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-4 flex-shrink-0">
                    <p className="text-sm text-slate-400">
                      📅 Click any phase below to add or edit its date. The Pre-Bid Walk kicks off the timeline - all other phases show their duration from the bid walk.
                    </p>
                  </div>

                  {/* Bid Schedule Items - Expandable Cards with Timeline */}
                  <div className="space-y-2 overflow-y-auto pr-2 pb-96">
                    {(() => {
                      // Find Pre-Bid Walk date to use as baseline
                      const preBidWalk = (selectedProject.bidSchedule || []).find(item => item.phase === 'Pre-Bid Walk');
                      const baselineDate = preBidWalk?.date ? parseLocalDate(preBidWalk.date) : null;
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      return (selectedProject.bidSchedule || []).map((item, index) => {
                        // Calculate days from Pre-Bid Walk
                        let daysFromBaseline = null;
                        let status = null;
                        let statusColor = '';
                        
                        if (item.date && baselineDate && item.phase !== 'Pre-Bid Walk') {
                          const itemDate = parseLocalDate(item.date);
                          daysFromBaseline = Math.round((itemDate - baselineDate) / (1000 * 60 * 60 * 24));
                          
                          // Determine if on schedule
                          const daysUntilDue = Math.round((itemDate - today) / (1000 * 60 * 60 * 24));
                          if (daysUntilDue < 0) {
                            status = 'overdue';
                            statusColor = 'text-red-400';
                          } else if (daysUntilDue === 0) {
                            status = 'today';
                            statusColor = 'text-yellow-400';
                          } else if (daysUntilDue <= 7) {
                            status = 'upcoming';
                            statusColor = 'text-orange-400';
                          } else {
                            status = 'scheduled';
                            statusColor = 'text-blue-400';
                          }
                        }

                        return (
                          <div
                            key={item.id}
                            id={`bid-item-${item.id}`}
                            className="bg-slate-900 rounded-lg p-4 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer flex-shrink-0"
                            onClick={() => {
                              if (editingBidItem?.id !== item.id) {
                                setEditingBidItem({ ...item });
                                // Scroll the card into view after a short delay
                                setTimeout(() => {
                                  document.getElementById(`bid-item-${item.id}`)?.scrollIntoView({ 
                                    behavior: 'smooth', 
                                    block: 'start'
                                  });
                                }, 100);
                              }
                            }}
                          >
                            {editingBidItem?.id === item.id ? (
                              // Edit Mode - Expanded
                              <div onClick={(e) => e.stopPropagation()}>
                                <div className="mb-3">
                                  <label className="block text-sm font-medium text-slate-300 mb-2">
                                    {item.phase}
                                  </label>
                                  <input
                                    type="date"
                                    value={editingBidItem.date}
                                    onChange={(e) => setEditingBidItem({ ...editingBidItem, date: e.target.value })}
                                    className="w-full max-w-full px-3 py-2 bg-slate-900 rounded border border-slate-800 focus:border-blue-500 focus:outline-none text-sm"
                                  />
                                </div>
                                
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateBidItem(selectedProject.id)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2"
                                  >
                                    <Check className="w-4 h-4" />
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingBidItem(null)}
                                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded flex items-center gap-2"
                                  >
                                    <X className="w-4 h-4" />
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // View Mode - Collapsed with Timeline
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-base">{item.phase}</h4>
                                    {item.phase === 'Pre-Bid Walk' && item.date && (
                                      <span className="text-xs px-2 py-0.5 bg-purple-900/50 text-purple-300 rounded">
                                        Baseline
                                      </span>
                                    )}
                                  </div>
                                  
                                  {item.date ? (
                                    <div className="space-y-1">
                                      <p className={`text-sm ${statusColor} font-medium`}>
                                        {parseLocalDate(item.date).toLocaleDateString('en-US', { 
                                          month: 'short', 
                                          day: 'numeric', 
                                          year: 'numeric' 
                                        })}
                                      </p>
                                      
                                      {/* Show days from baseline for non-baseline items */}
                                      {daysFromBaseline !== null && (
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs text-slate-500">
                                            +{daysFromBaseline} {daysFromBaseline === 1 ? 'day' : 'days'} from bid walk
                                          </span>
                                          {status === 'overdue' && (
                                            <span className="text-xs px-1.5 py-0.5 bg-red-900/50 text-red-300 rounded flex items-center gap-1">
                                              ⚠️ Overdue
                                            </span>
                                          )}
                                          {status === 'today' && (
                                            <span className="text-xs px-1.5 py-0.5 bg-yellow-900/50 text-yellow-300 rounded flex items-center gap-1">
                                              📍 Today
                                            </span>
                                          )}
                                          {status === 'upcoming' && (
                                            <span className="text-xs px-1.5 py-0.5 bg-orange-900/50 text-orange-300 rounded flex items-center gap-1">
                                              ⏰ Soon
                                            </span>
                                          )}
                                        </div>
                                      )}
                                      
                                      {/* Show warning if no baseline set */}
                                      {!baselineDate && item.phase !== 'Pre-Bid Walk' && (
                                        <p className="text-xs text-slate-500 italic">
                                          Set Pre-Bid Walk date to see timeline
                                        </p>
                                      )}
                                    </div>
                                  ) : (
                                    <p className="text-sm text-slate-500 mt-1">No date set</p>
                                  )}
                                </div>
                                <Edit2 className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
                              </div>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}

              {/* Meeting Notes Section */}
              {projectTab === 'meetings' && (
                <div>
                  {/* Add Meeting Note Form */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
                    <h3 className="font-semibold mb-3">Add Meeting Note</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Meeting Title *"
                        value={newMeetingNote.title}
                        onChange={(e) => setNewMeetingNote({ ...newMeetingNote, title: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                      <textarea
                        placeholder="Meeting notes (supports bullet points - just use • or - at the start of lines)"
                        value={newMeetingNote.notes}
                        onChange={(e) => setNewMeetingNote({ ...newMeetingNote, notes: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none resize-none font-mono text-sm"
                        rows="8"
                      />
                      <button
                        onClick={() => addMeetingNote(selectedProject.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Meeting Note
                      </button>
                    </div>
                  </div>

                  {/* Meeting Notes List */}
                  <div className="space-y-4">
                    {(selectedProject.meetingNotes || []).length === 0 ? (
                      <div className="bg-slate-900 rounded-lg p-8 text-center text-slate-400">
                        No meeting notes yet. Add your first note above.
                      </div>
                    ) : (
                      (selectedProject.meetingNotes || [])
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map((note) => (
                          <div
                            key={note.id}
                            className="bg-slate-900 rounded-lg p-4 border border-slate-800"
                          >
                            {editingMeetingNote?.id === note.id ? (
                              // Edit Mode
                              <div>
                                <input
                                  type="text"
                                  value={editingMeetingNote.title}
                                  onChange={(e) => setEditingMeetingNote({ ...editingMeetingNote, title: e.target.value })}
                                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mb-3"
                                  placeholder="Meeting Title"
                                />
                                <textarea
                                  value={editingMeetingNote.notes}
                                  onChange={(e) => setEditingMeetingNote({ ...editingMeetingNote, notes: e.target.value })}
                                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none mb-3 resize-none font-mono text-sm"
                                  rows="8"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => updateMeetingNote(selectedProject.id)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2"
                                  >
                                    <Check className="w-4 h-4" />
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingMeetingNote(null)}
                                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 rounded flex items-center gap-2"
                                  >
                                    <X className="w-4 h-4" />
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => {
                                      confirmDelete('meetingnote', editingMeetingNote.id, selectedProject.id, editingMeetingNote.title);
                                    }}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2 ml-auto"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // View Mode
                              <div>
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h4 className="text-lg font-semibold mb-1">{note.title}</h4>
                                    <p className="text-xs text-slate-500">
                                      {new Date(note.timestamp).toLocaleString()}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => setEditingMeetingNote({ ...note })}
                                    className="text-blue-400 hover:text-blue-300 ml-4"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                </div>
                                <div className="bg-slate-800/50 rounded p-4">
                                  <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">{note.notes}</pre>
                                </div>
                              </div>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}

              {/* Project Team Tab */}
              {projectTab === 'team' && (
                <div>
                  {/* Add Team Member Section */}
                  <div className="bg-slate-900 rounded-lg p-4 sm:p-6 border border-slate-800 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Add Team Member</h3>
                    <div className="space-y-3">
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            addTeamMember(selectedProject.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select a contact to add...</option>
                        {contacts
                          .filter(contact => {
                            // Filter out contacts already on the team
                            const teamMemberIds = (selectedProject.projectTeam || []).map(m => m.contactId);
                            return !teamMemberIds.includes(contact.id);
                          })
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(contact => (
                            <option key={contact.id} value={contact.id}>
                              {contact.name} - {contact.company || contact.role || 'No company/role'}
                            </option>
                          ))
                        }
                      </select>
                      <p className="text-xs text-slate-400">
                        Select from your existing contacts. Need to add a new contact? Go to the Team section.
                      </p>
                    </div>
                  </div>

                  {/* Team Members Display - Grouped by Trade */}
                  <div className="space-y-6">
                    {(() => {
                      const teamMembers = selectedProject.projectTeam || [];
                      
                      if (teamMembers.length === 0) {
                        return (
                          <div className="text-center py-12 text-slate-400">
                            <p className="text-lg mb-2">No team members yet</p>
                            <p className="text-sm">Add team members from your contacts above</p>
                          </div>
                        );
                      }

                      // Group team members by their primary trade
                      const groupedByTrade = teamMembers.reduce((acc, member) => {
                        const primaryTrade = member.trades && member.trades.length > 0 
                          ? member.trades[0] 
                          : 'Unassigned';
                        
                        if (!acc[primaryTrade]) {
                          acc[primaryTrade] = [];
                        }
                        acc[primaryTrade].push(member);
                        return acc;
                      }, {});

                      // Sort trades to match the teams dropdown order, with Unassigned at the end
                      const sortedTrades = Object.keys(groupedByTrade).sort((a, b) => {
                        if (a === 'Unassigned') return 1;
                        if (b === 'Unassigned') return -1;
                        
                        // Get index in allTeams array
                        const indexA = allTeams.indexOf(a);
                        const indexB = allTeams.indexOf(b);
                        
                        // If both are in the array, sort by their position
                        if (indexA !== -1 && indexB !== -1) {
                          return indexA - indexB;
                        }
                        // If only one is in the array, prioritize it
                        if (indexA !== -1) return -1;
                        if (indexB !== -1) return 1;
                        // If neither is in the array, sort alphabetically
                        return a.localeCompare(b);
                      });

                      return sortedTrades.map(trade => (
                        <div key={trade} className="bg-slate-900 rounded-lg border border-slate-800">
                          <div className="bg-slate-800 px-4 sm:px-6 py-3 rounded-t-lg border-b border-slate-700">
                            <h3 className="font-semibold text-lg flex items-center gap-2">
                              {trade === 'Unassigned' ? '❓' : '👷'} {trade}
                              <span className="text-sm text-slate-400 font-normal">
                                ({groupedByTrade[trade].length} {groupedByTrade[trade].length === 1 ? 'member' : 'members'})
                              </span>
                            </h3>
                          </div>
                          
                          <div className="p-4 sm:p-6 space-y-4">
                            {groupedByTrade[trade].map(member => {
                              const isExpanded = expandedTeamMembers[member.id];
                              
                              return (
                                <div key={member.id} className="bg-slate-800 rounded-lg border border-slate-700">
                                  {/* Collapsed View - Just Name and Company */}
                                  <div 
                                    className="p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                                    onClick={() => setExpandedTeamMembers({
                                      ...expandedTeamMembers,
                                      [member.id]: !isExpanded
                                    })}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-base sm:text-lg">{member.name}</h4>
                                        {member.company && (
                                          <p className="text-sm text-blue-400 mt-0.5">{member.company}</p>
                                        )}
                                      </div>
                                      <div className="text-slate-400 ml-2">
                                        {isExpanded ? '▼' : '▶'}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Expanded View - Full Details */}
                                  {isExpanded && (
                                    <div className="px-4 pb-4 space-y-3 border-t border-slate-700 pt-3">
                                      {member.role && (
                                        <div>
                                          <p className="text-xs text-slate-400 mb-1">Role</p>
                                          <p className="text-sm">{member.role}</p>
                                        </div>
                                      )}
                                      
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        {member.email && (
                                          <div>
                                            <p className="text-xs text-slate-400 mb-1">Email</p>
                                            <a href={`mailto:${member.email}`} className="text-blue-400 hover:text-blue-300 break-all">
                                              {member.email}
                                            </a>
                                          </div>
                                        )}
                                        {member.phone && (
                                          <div>
                                            <p className="text-xs text-slate-400 mb-1">Phone</p>
                                            <a href={`tel:${member.phone}`} className="text-blue-400 hover:text-blue-300">
                                              {member.phone}
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                      
                                      {member.trades && member.trades.length > 1 && (
                                        <div>
                                          <p className="text-xs text-slate-400 mb-1">All Trades</p>
                                          <div className="flex flex-wrap gap-1">
                                            {member.trades.map((trade, idx) => (
                                              <span key={idx} className="px-2 py-1 bg-slate-700 rounded text-xs">
                                                {trade}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      
                                      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                                        <p className="text-xs text-slate-500">
                                          Added {new Date(member.addedAt).toLocaleDateString()}
                                        </p>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (window.confirm(`Remove ${member.name} from project team?`)) {
                                              removeTeamMember(selectedProject.id, member.id);
                                            }
                                          }}
                                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded text-sm flex items-center gap-1"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}

              {/* Warranty Period Card - At bottom of Schedule */}
              {projectTab === 'schedule' && (
                <div className="mt-6 bg-slate-900 rounded-lg p-4 border border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    🛡️ Warranty Period
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">
                        Warranty Start Date
                      </label>
                      <input
                        type="date"
                        value={selectedProject.warrantyStartDate || ''}
                        onChange={async (e) => {
                          const updatedProjects = projects.map(p =>
                            p.id === selectedProject.id
                              ? { ...p, warrantyStartDate: e.target.value }
                              : p
                          );
                          setProjects(updatedProjects);
                          setSelectedProject({ ...selectedProject, warrantyStartDate: e.target.value });
                          await saveProjects(updatedProjects);
                        }}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">
                        Warranty End Date
                      </label>
                      <input
                        type="date"
                        value={selectedProject.warrantyEndDate || ''}
                        onChange={async (e) => {
                          const updatedProjects = projects.map(p =>
                            p.id === selectedProject.id
                              ? { ...p, warrantyEndDate: e.target.value }
                              : p
                          );
                          setProjects(updatedProjects);
                          setSelectedProject({ ...selectedProject, warrantyEndDate: e.target.value });
                          await saveProjects(updatedProjects);
                        }}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {selectedProject.warrantyStartDate && selectedProject.warrantyEndDate && (() => {
                    const start = new Date(selectedProject.warrantyStartDate);
                    const end = new Date(selectedProject.warrantyEndDate);
                    const today = new Date();
                    const daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
                    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                    const daysElapsed = totalDays - daysRemaining;
                    const percentComplete = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));

                    return (
                      <div className="mt-4">
                        {/* Warranty Status */}
                        <div className="flex items-center justify-between mb-2 text-sm">
                          <span className="text-slate-400">
                            {daysRemaining > 0 
                              ? `${daysRemaining} days remaining` 
                              : daysRemaining === 0
                              ? 'Warranty ends today'
                              : 'Warranty expired'}
                          </span>
                          <span className="text-slate-400">
                            {start.toLocaleDateString()} - {end.toLocaleDateString()}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              daysRemaining < 0 
                                ? 'bg-red-600' 
                                : daysRemaining < 30 
                                ? 'bg-yellow-600' 
                                : 'bg-green-600'
                            }`}
                            style={{ width: `${percentComplete}%` }}
                          ></div>
                        </div>

                        {/* Warning if expiring soon */}
                        {daysRemaining > 0 && daysRemaining < 30 && (
                          <div className="mt-3 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg flex items-start gap-2">
                            <span className="text-yellow-400 text-xl">⚠️</span>
                            <div>
                              <p className="text-sm font-semibold text-yellow-400">Warranty Expiring Soon</p>
                              <p className="text-xs text-slate-400 mt-1">
                                Only {daysRemaining} days remaining. Review any outstanding warranty claims.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Expired warning */}
                        {daysRemaining < 0 && (
                          <div className="mt-3 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-start gap-2">
                            <span className="text-red-400 text-xl">❌</span>
                            <div>
                              <p className="text-sm font-semibold text-red-400">Warranty Expired</p>
                              <p className="text-xs text-slate-400 mt-1">
                                Warranty period ended {Math.abs(daysRemaining)} days ago.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Floor Plans Tab */}
              {projectTab === 'floorplans' && (
                <div>
                  {/* Add Floor Plan Form */}
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 mb-6">
                    <h3 className="font-semibold mb-3">Upload Floor Plan</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Floor Plan Title (e.g., 'First Floor Plan', 'Site Layout') *"
                        value={newFloorPlan.title}
                        onChange={(e) => setNewFloorPlan({ ...newFloorPlan, title: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                      />
                      
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Upload Image *</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFloorPlanFileUpload}
                          className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />
                        {newFloorPlan.file && (
                          <p className="text-xs text-slate-400 mt-1">Selected: {newFloorPlan.file.name}</p>
                        )}
                      </div>

                      {newFloorPlan.fileUrl && (
                        <div className="border border-slate-700 rounded p-2">
                          <p className="text-xs text-slate-400 mb-2">Preview:</p>
                          <img 
                            src={newFloorPlan.fileUrl} 
                            alt="Preview" 
                            className="max-h-40 rounded"
                          />
                        </div>
                      )}
                      
                      <button
                        onClick={() => addFloorPlan(selectedProject.id)}
                        disabled={!newFloorPlan.title.trim() || !newFloorPlan.fileUrl}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                        Upload Floor Plan
                      </button>
                    </div>
                  </div>

                  {/* Floor Plans Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(selectedProject.floorPlans || []).length === 0 ? (
                      <div className="col-span-full bg-slate-900 rounded-lg p-8 text-center text-slate-400 border border-slate-800">
                        No floor plans uploaded yet. Upload your first floor plan above.
                      </div>
                    ) : (
                      (selectedProject.floorPlans || [])
                        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                        .map(plan => (
                          <div
                            key={plan.id}
                            className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors cursor-pointer"
                            onClick={() => setExpandedFloorPlan(plan)}
                          >
                            {/* Image Preview */}
                            <div className="relative group">
                              <img
                                src={plan.fileUrl}
                                alt={plan.title}
                                className="w-full h-48 object-cover"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                                  Click to view
                                </span>
                              </div>
                            </div>

                            {/* Plan Info */}
                            <div className="p-4">
                              <h4 className="font-semibold mb-1 truncate">{plan.title}</h4>
                              <p className="text-xs text-slate-400">
                                📅 {new Date(plan.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expanded Floor Plan Modal */}
      {expandedFloorPlan && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setExpandedFloorPlan(null)}
        >
          <div className="max-w-7xl w-full max-h-full overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="bg-slate-900 rounded-lg border border-slate-700">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <div>
                  <h3 className="text-xl font-bold">{expandedFloorPlan.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    📅 {new Date(expandedFloorPlan.timestamp).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setExpandedFloorPlan(null)}
                  className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image */}
              <div className="p-4 flex items-center justify-center bg-slate-950">
                <img
                  src={expandedFloorPlan.fileUrl}
                  alt={expandedFloorPlan.title}
                  className="max-w-full max-h-[80vh] object-contain rounded"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between p-4 border-t border-slate-700">
                <div className="flex items-center gap-3">
                  <a
                    href={expandedFloorPlan.fileUrl}
                    download={expandedFloorPlan.fileName}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </a>
                  <button
                    onClick={() => {
                      setItemToDelete({
                        type: 'floor-plan',
                        id: expandedFloorPlan.id,
                        projectId: selectedProject.id,
                        name: expandedFloorPlan.title
                      });
                      setExpandedFloorPlan(null);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
                <button
                  onClick={() => setExpandedFloorPlan(null)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg p-6 max-w-md w-full border border-slate-800">
            <h3 className="text-xl font-semibold mb-4">Archive Project?</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to archive "{projects.find(p => p.id === projectToDelete)?.name}"?
              You can restore it later from the Archived view.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => deleteProject(projectToDelete)}
                className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded font-medium"
              >
                Archive Project
              </button>
              <button
                onClick={cancelDeleteProject}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generic Item Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg p-6 max-w-md w-full border border-slate-800">
            <h3 className="text-xl font-semibold mb-4">Delete {itemToDelete.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}?</h3>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete {itemToDelete.name ? `"${itemToDelete.name}"` : 'this item'}? 
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={executeDelete}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-medium"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-lg p-6 max-w-md w-full border border-slate-800 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Project</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={editingProject.address || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, address: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Type
                </label>
                <select
                  value={editingProject.projectType || 'Standard'}
                  onChange={(e) => {
                    if (e.target.value === '__ADD_NEW__') {
                      setShowNewProjectTypeInput(true);
                    } else {
                      setEditingProject({ ...editingProject, projectType: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                >
                  {allProjectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                  <option value="__ADD_NEW__">+ Add Custom Type</option>
                </select>
                
                {showNewProjectTypeInput && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={newProjectTypeName}
                      onChange={(e) => setNewProjectTypeName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addNewProjectType();
                          setEditingProject({ ...editingProject, projectType: newProjectTypeName.trim() });
                        }
                      }}
                      placeholder="Enter new project type"
                      className="flex-1 px-3 py-2 bg-slate-700 rounded border border-slate-600 focus:border-blue-500 focus:outline-none text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        addNewProjectType();
                        setEditingProject({ ...editingProject, projectType: newProjectTypeName.trim() });
                      }}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setShowNewProjectTypeInput(false);
                        setNewProjectTypeName('');
                      }}
                      className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded text-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Square Footage
                </label>
                <input
                  type="text"
                  value={editingProject.sqft || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, sqft: e.target.value })}
                  placeholder="e.g., 50000"
                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Approved Budget
                </label>
                <input
                  type="text"
                  value={editingProject.approvedBudget || ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setEditingProject({ ...editingProject, approvedBudget: value });
                  }}
                  placeholder="e.g., 1000000"
                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                />
                {editingProject.approvedBudget && (
                  <p className="text-sm text-slate-400 mt-1">
                    ${parseInt(editingProject.approvedBudget).toLocaleString()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Lease Expiration (Optional)
                </label>
                <input
                  type="date"
                  value={editingProject.leaseExpiration || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, leaseExpiration: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Logo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setEditingProject({ ...editingProject, logo: event.target.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-4 py-2 bg-slate-800 rounded border border-slate-700 focus:border-blue-500 focus:outline-none text-slate-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                {editingProject.logo && (
                  <div className="mt-2">
                    <img src={editingProject.logo} alt="Logo preview" className="h-16 object-contain bg-slate-700 p-2 rounded" />
                    <button
                      onClick={() => setEditingProject({ ...editingProject, logo: '' })}
                      className="mt-1 text-xs text-red-400 hover:text-red-300"
                    >
                      Remove logo
                    </button>
                  </div>
                )}
                <p className="text-xs text-slate-400 mt-1">Logo will appear on exported PDF reports</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveEditedProject}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingProject(null);
                }}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
