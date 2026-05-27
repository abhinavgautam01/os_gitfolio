"use client";

import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Download, Share2, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useState } from 'react';
import { toast } from 'sonner';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

export function ExportBar({ username }: { username: string }) {
  const [isExporting, setIsExporting] = useState(false);

  const generateImageData = async (element: HTMLElement): Promise<string> => {
    // Inject a temporary <style> tag that controls export-time visibility via CSS
    const style = document.createElement('style');
    style.id = 'export-override-styles';
    style.textContent = `
      /* Hide elements marked to be excluded from export */
      [data-export-exclude="true"] { display: none !important; }
      /* Expand the repo scroll container so all items show */
      .repo-scroll-container { overflow: visible !important; max-height: none !important; }
      /* Hide the 3rd repo card - only show 2 in export */
      .repo-scroll-container .repo-card:nth-child(n+3) { display: none !important; }
      /* Expand any other overflow containers */
      [data-export-expand] { overflow: visible !important; max-height: none !important; }
    `;
    document.head.appendChild(style);

    // Also force the root to be full width
    const prevWidth = element.style.width;
    const prevMaxWidth = element.style.maxWidth;
    const prevPosition = element.style.position;
    element.style.width = '1440px';
    element.style.maxWidth = '1440px';
    element.style.position = 'relative';

    // Wait for browser to re-layout with the CSS overrides applied
    await new Promise(resolve => setTimeout(resolve, 400));

    try {
      const captureWidth = element.scrollWidth;
      const captureHeight = element.scrollHeight;

      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#0a0a0f',
        width: captureWidth,
        height: captureHeight,
        style: {
          transform: 'none',
          margin: '0',
        },
        filter: (node) => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('export-bar')) return false;
          }
          return true;
        }
      });
      return dataUrl;
    } finally {
      // Remove the injected style tag and restore root styles
      document.getElementById('export-override-styles')?.remove();
      element.style.width = prevWidth;
      element.style.maxWidth = prevMaxWidth;
      element.style.position = prevPosition;
    }
  };

  const handleExport = async (type: string) => {
    setIsExporting(true);
    const toastId = toast.loading(`Generating high-quality ${type.toUpperCase()}...`);
    
    try {
      const element = document.getElementById('profile-export-area');
      if (!element) throw new Error('Could not find profile area');

      const dataUrl = await generateImageData(element);

      if (type === 'pdf') {
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        // Calculate aspect ratio for the PDF
        const pdf = new jsPDF({
          orientation: height > width ? 'portrait' : 'landscape',
          unit: 'px',
          format: [width, height]
        });
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);
        pdf.save(`${username}-gitfolio-stats.pdf`);
      } else {
        // Handle PNG
        const link = document.createElement('a');
        link.download = `${username}-gitfolio-stats.png`;
        link.href = dataUrl;
        link.click();
      }
      
      toast.success(`${type.toUpperCase()} exported successfully!`, { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to generate ${type.toUpperCase()}`, { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${username}'s OS_Gitfolio`,
          text: `Check out ${username}'s developer stats!`,
          url: shareUrl,
        });
        toast.success('Shared successfully!');
      } catch (err) {
        // User aborted the share dialog, do nothing
        console.log(err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Profile link copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy link');
      }
    }
  };

  return (
    <GlassCard className="export-bar flex flex-wrap items-center justify-between p-4 sticky bottom-4 z-40">
      <div className="flex items-center gap-2 text-sm text-text-secondary font-medium mb-2 sm:mb-0">
        <Download className="w-4 h-4" /> Export Report
      </div>
      
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" onClick={() => handleExport('png')} disabled={isExporting}>
                {isExporting ? <Loader2 className="w-4 h-4 sm:mr-2 animate-spin" /> : <ImageIcon className="w-4 h-4 sm:mr-2" />} 
                <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'PNG'}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download as Image</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm" onClick={() => handleExport('pdf')}>
                <FileText className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">PDF</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download as PDF</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="primary" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 sm:mr-2" /> <span className="hidden sm:inline">Share</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy Link</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </GlassCard>
  );
}
