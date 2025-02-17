<template>
    <div class="ml-2 flex h-auto flex-row gap-1 pt-1">
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button variant="secondary" :disabled="start || running" @click="previousStep">
                        <ChevronLeft class="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Run previous step</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger>
                    <Button variant="secondary" :disabled="end || running" @click="nextStep">
                        <ChevronRight class="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Run next step</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger>
                    <Button :disabled="end || running" @click="allSteps">
                        <LoaderCircle v-if="running" class="h-4 w-4 animate-spin" />
                        <ChevronLast v-else class="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Run all step</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger>
                    <Button :disabled="!running" @click="stop">
                        <OctagonX class="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Abort simulation</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger>
                    <Button variant="destructive" :disabled="start || running" @click="reset">
                        <RotateCcw class="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Reset machine to initial state</p>
                </TooltipContent>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger>
                    <Button variant="secondary" :disabled="running" @click="check">
                        <MonitorCheck class="h-4 w-4" /> Run tests
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Run tests</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
</template>

<script setup lang="ts">
import {
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    LoaderCircle,
    OctagonX,
    RotateCcw,
    MonitorCheck,
} from "lucide-vue-next";

interface Props {
    start: boolean;
    end: boolean;
    running: boolean;
    previousStep: (...args: unknown[]) => void;
    nextStep: (...args: unknown[]) => void;
    allSteps: (...args: unknown[]) => void;
    stop: (...args: unknown[]) => void;
    reset: (...args: unknown[]) => void;
    check: (...args: unknown[]) => void;
}

defineProps<Props>();

</script>