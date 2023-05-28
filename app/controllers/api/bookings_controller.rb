class Api::BookingsController < ApplicationController

    #wrap_parameters :booking, include: Booking.attribute_names
    def create       
        @booking = Booking.new(booking_params)
        if @booking.save
            render :show
        else
            render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def destroy
        @booking = Booking.find(params[:id])
        @booking.destroy
        render json: params[:id]
    end

    def index
        if params[:user_id].present?
            @bookings = Booking.where(user_id: params[:user_id])
        else
            @bookings = Booking.all
        end

        render :index
    end
    
    def update 
        @booking = Booking.find(params[:id])
        if @booking.update(booking_params)
            render :show
        else
            render json: { errors: @booking.errors.full_messages },  status: 422
        end
    end

    private
    def booking_params
        params.require(:booking).permit(:user_id, :listing_id, :date, :time, :participants)
    end
end