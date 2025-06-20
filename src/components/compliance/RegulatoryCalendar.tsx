import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  ExternalLink,
  Filter,
  Plus,
  Video,
  Users,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useComplianceStore } from '../../store/complianceStore';
import { CalendarEvent, ComplianceDeadline } from '../../types/compliance';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';

interface CalendarDay {
  date: Date;
  events: any[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

export const RegulatoryCalendar: React.FC = () => {
  const { 
    regulatoryCalendar, 
    upcomingDeadlines, 
    isLoading,
    fetchCountryGuides 
  } = useComplianceStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [eventFilter, setEventFilter] = useState<string>('all');

  useEffect(() => {
    fetchCountryGuides();
  }, [fetchCountryGuides]);

  // Combine calendar events and deadlines
  const allEvents = [
    ...regulatoryCalendar.map(event => ({ ...event, sourceType: 'calendar' as const })),
    ...upcomingDeadlines.map(deadline => ({ 
      ...deadline, 
      sourceType: 'deadline' as const,
      eventType: 'deadline' as const,
      startDate: deadline.dueDate,
      title: deadline.title,
      description: deadline.description,
      priority: deadline.priority,
      tags: [deadline.countryName, deadline.deadlineType]
    }))
  ];

  // Filter events based on selected filter
  const filteredEvents = allEvents.filter(event => {
    if (eventFilter === 'all') return true;
    if (eventFilter === 'deadlines') return event.sourceType === 'deadline';
    if (eventFilter === 'conferences') return event.eventType === 'conference';
    if (eventFilter === 'workshops') return event.eventType === 'workshop';
    if (eventFilter === 'regulatory_changes') return event.eventType === 'regulatory_change';
    return true;
  });

  // Generate calendar days
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const calendarData: CalendarDay[] = calendarDays.map(date => {
    const dayEvents = filteredEvents.filter(event => 
      isSameDay(new Date(event.startDate), date)
    );

    return {
      date,
      events: dayEvents,
      isCurrentMonth: isSameMonth(date, currentDate),
      isToday: isSameDay(date, new Date())
    };
  });

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'deadline': return 'error';
      case 'conference': return 'info';
      case 'workshop': return 'success';
      case 'regulatory_change': return 'warning';
      case 'industry_event': return 'neutral';
      default: return 'neutral';
    }
  };

  const getEventTypeIcon = (eventType: string) => {
    switch (eventType) {
      case 'deadline': return <AlertTriangle className="w-3 h-3" />;
      case 'conference': return <Users className="w-3 h-3" />;
      case 'workshop': return <Video className="w-3 h-3" />;
      case 'regulatory_change': return <Calendar className="w-3 h-3" />;
      case 'industry_event': return <MapPin className="w-3 h-3" />;
      default: return <Calendar className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const selectedDayEvents = selectedDay 
    ? filteredEvents.filter(event => isSameDay(new Date(event.startDate), selectedDay))
    : [];

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Calendario Regulatorio
          </h3>
          <div className="flex items-center gap-3">
            {/* Event Filter */}
            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los eventos</option>
              <option value="deadlines">Vencimientos</option>
              <option value="conferences">Conferencias</option>
              <option value="workshops">Workshops</option>
              <option value="regulatory_changes">Cambios Regulatorios</option>
            </select>
            <Button variant="secondary" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Evento
            </Button>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <h4 className="text-xl font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy', { locale: es })}
          </h4>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Day headers */}
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {calendarData.map((day, index) => (
            <div
              key={index}
              className={`min-h-[80px] p-1 border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                day.isToday ? 'bg-blue-50 border-blue-300' : ''
              } ${
                selectedDay && isSameDay(day.date, selectedDay) ? 'bg-blue-100 border-blue-400' : ''
              }`}
              onClick={() => setSelectedDay(day.date)}
            >
              <div className={`text-sm font-medium mb-1 ${
                day.isToday ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {format(day.date, 'd')}
              </div>
              
              {/* Events indicators */}
              <div className="space-y-1">
                {day.events.slice(0, 2).map((event, eventIndex) => (
                                     <div
                     key={eventIndex}
                     className={`w-full h-1 rounded ${
                       event.sourceType === 'deadline' 
                         ? getPriorityColor((event as any).priority)
                         : 'bg-blue-500'
                     }`}
                   />
                ))}
                {day.events.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{day.events.length - 2} más
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-red-500 rounded"></div>
            <span>Crítico</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-orange-500 rounded"></div>
            <span>Alto</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-blue-500 rounded"></div>
            <span>Medio</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 bg-green-500 rounded"></div>
            <span>Bajo</span>
          </div>
        </div>
      </Card>

      {/* Selected Day Events */}
      {selectedDay && selectedDayEvents.length > 0 && (
        <Card className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Eventos para {format(selectedDay, 'dd MMMM yyyy', { locale: es })}
          </h4>
          
          <div className="space-y-4">
            {selectedDayEvents.map((event, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getEventTypeColor(event.eventType) as any}>
                        {getEventTypeIcon(event.eventType)}
                        {event.eventType === 'deadline' ? 'Vencimiento' :
                         event.eventType === 'conference' ? 'Conferencia' :
                         event.eventType === 'workshop' ? 'Workshop' :
                         event.eventType === 'regulatory_change' ? 'Cambio Regulatorio' :
                         'Evento'}
                      </Badge>
                      
                                             {event.sourceType === 'deadline' && (
                         <Badge variant={getEventTypeColor((event as any).priority) as any}>
                           {(event as any).priority === 'critical' ? 'Crítico' :
                            (event as any).priority === 'high' ? 'Alto' :
                            (event as any).priority === 'medium' ? 'Medio' : 'Bajo'}
                         </Badge>
                       )}
                      
                      {(event as any).countryCode && (
                        <Badge variant="neutral">
                          {(event as any).countryCode}
                        </Badge>
                      )}
                    </div>
                    
                    <h5 className="font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h5>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {(event as any).location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {(event as any).location}
                        </span>
                      )}
                      
                      {(event as any).isVirtual && (
                        <span className="flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Virtual
                        </span>
                      )}
                      
                                             {event.sourceType === 'deadline' && (event as any).assignedToName && (
                         <span className="flex items-center gap-1">
                           <Users className="w-3 h-3" />
                           {(event as any).assignedToName}
                         </span>
                       )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 ml-4">
                    {(event as any).registrationUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open((event as any).registrationUrl, '_blank')}
                        className="p-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}; 